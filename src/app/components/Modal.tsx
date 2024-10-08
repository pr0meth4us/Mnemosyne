import React, { useState } from 'react';
import { Tooltip, Checkbox, Button } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import ExtractText from "@/app/utils/ExtractText";
import { Input } from "@nextui-org/input";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    result: Data;
    filename: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, result, filename }) => {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [chatFiles, setChatFiles] = useState<ChatFile[]>([]);
    const [showDownloadButtons, setShowDownloadButtons] = useState(false);
    const [loadingPDFs, setLoadingPDFs] = useState<{ [key: string]: boolean }>({});
    const [usernameInput, setUsernameInput] = useState(false);
    const [username, setUsername] = useState("");
    const [extracting, setExtracting] = useState<boolean>(false);

    if (!isOpen) return null;

    const { chatHistories, me, usernames } = result;
    console.log("jui", usernames)

    const handleChatSelect = (chat: string) => {
        setSelectedUsers((prev) =>
            prev.includes(chat) ? prev.filter((c) => c !== chat) : [...prev, chat]
        );
    };

    const selectAllChats = () => {
        setSelectedUsers(result.usernames);
    };

    const deselectAllChats = () => {
        setSelectedUsers([]);
    };

    const handleNext = async () => {
        let files: ChatFile[];

        if (me) {
            setExtracting(true);
            files = await ExtractText({ selectedUsers, chatHistories, me });
            setExtracting(false);
        } else {
            setUsernameInput(true);
            setExtracting(true);
            files = await ExtractText({ selectedUsers, chatHistories, me });
            setExtracting(false);
            setUsernameInput(false);
        }
        setChatFiles(files);
        setShowDownloadButtons(true);
    };

    const handleDownload = (file: ChatFile) => {
        const blob = new Blob([file.content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.filename}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDownloadPDF = async (file: ChatFile) => {
        setLoadingPDFs(prev => ({ ...prev, [file.filename]: true }));
        try {
            const response = await fetch('/api/convertHtmlToPdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ htmlContent: file.content, name: file.filename })
            });
            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }
            const pdfBlob = await response.blob();
            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file.filename}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        } finally {
            setLoadingPDFs(prev => ({ ...prev, [file.filename]: false }));
        }
    };

    return (
        <div className="overflow-y-auto fixed inset-0 flex items-center justify-center z-50 w-full md:inset-0 h-[calc(100%-1rem)]">
            <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            File: {filename}
                        </h3>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        {!showDownloadButtons ? (
                            <>
                                <h3 className="font-semibold text-md mt-4">Chat History with:</h3>
                                <ul className="mt-4 space-y-3">
                                    <li className="mt-1 text-white">
                                        <Checkbox
                                            aria-label="Select All Chats"
                                            classNames={{
                                                base: cn(
                                                    "items-center justify-start text-white",
                                                    "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                ),
                                                label: "w-full text-white",
                                            }}
                                            isSelected={selectedUsers.length === result.usernames.length && result.usernames.length > 0} // Adjusted chatList
                                            onValueChange={() => {
                                                if (selectedUsers.length === result.usernames.length) {
                                                    deselectAllChats();
                                                } else {
                                                    selectAllChats();
                                                }
                                            }}
                                        >
                                            {selectedUsers.length === result.usernames.length ? "Deselect All" : "Select All"}
                                        </Checkbox>
                                    </li>
                                </ul>
                                <ul className="my-4 space-y-3">
                                    {usernames.map((username: string, index: number) => (
                                        <li key={index} className="mt-1 text-white">
                                            <Checkbox
                                                aria-label={username}
                                                classNames={{
                                                    base: cn(
                                                        "items-center justify-start text-white",
                                                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                    ),
                                                    label: "w-full text-white",
                                                }}
                                                isSelected={selectedUsers.includes(username)}
                                                onValueChange={() => handleChatSelect(username)}
                                            >
                                                {username.match(/with (.+?):/)?.[1] || username}
                                            </Checkbox>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="flat"
                                        className="bg-foreground text-background px-4 py-2 rounded"
                                        onClick={handleNext}
                                        isLoading ={extracting}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </>
                        ) : (
                            !usernameInput ? (
                                <>
                                    <h3 className="font-semibold text-md mt-4">Download Chat Histories:</h3>
                                    <ul className="my-4 space-y-3">
                                        {chatFiles.map((file, index) => (
                                            <li key={index} className="mt-1 flex gap-2 w-full relative">
                                                <Button
                                                    variant="flat"
                                                    className="bg-foreground text-background px-4 py-2 rounded w-full text-center flex-grow"
                                                    onClick={() => handleDownload(file)}
                                                >
                                                    {file.filename}.html
                                                </Button>
                                                <Tooltip
                                                    content={loadingPDFs[file.filename] ? "PDF may take a while to process" : ""}
                                                    isOpen={loadingPDFs[file.filename]}
                                                    key="default"
                                                    color="foreground"
                                                    placement="right"
                                                >
                                                    <Button
                                                        variant="flat"
                                                        className="bg-foreground text-background px-4 py-2 rounded w-full text-center flex-grow"
                                                        onClick={() => handleDownloadPDF(file)}
                                                        isLoading={loadingPDFs[file.filename]}
                                                    >
                                                        {file.filename}.pdf
                                                    </Button>
                                                </Tooltip>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-end w-full space-x-2">
                                        <Button
                                            variant="flat"
                                            className="bg-foreground text-background px-4 py-2 rounded"
                                            onClick={() => setShowDownloadButtons(false)}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-semibold text-md my-4">Username</h3>
                                    <div className="inline-flex items-baseline mb-4 text-sm text-default-500">
                                        <p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor"
                                                 className="inline-block pr-1 w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                                            </svg>
                                            Type the username to proceed with
                                        </p>
                                    </div>
                                    <Input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                        placeholder="Enter your username"
                                        className="text-white bg-transparent border border-gray-600 rounded-md"
                                    />
                                    <div className="flex justify-end w-full space-x-2 mt-4">
                                        <Button
                                            variant="flat"
                                            className="bg-foreground text-background px-4 py-2 rounded"
                                            onClick={handleNext}
                                            isLoading ={extracting}

                                        >
                                            Next
                                        </Button>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                </div>
        </div>
    );
};

export default Modal;
