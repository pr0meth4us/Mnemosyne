import React, { useState } from 'react';
import { Checkbox } from "@nextui-org/react";
import { cn, Button } from "@nextui-org/react";
import ExtractText from "@/app/utils/ExtractText"; // Make sure you have this utility available

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    result: { people:string, json:string };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, result }) => {
    const [selectedChats, setSelectedChats] = useState<string[]>([]);

    if (!isOpen) return null;

    let formattedContent = null;
    const content = result.people;

    const handleChatSelect = (chat: string) => {
        setSelectedChats((prev) =>
            prev.includes(chat) ? prev.filter((c) => c !== chat) : [...prev, chat]
        );
    };

    const selectAllChats = () => {
        const jsonData = JSON.parse(content);
        const chatList = jsonData.chatList || [];
        setSelectedChats(chatList);
    };

    const deselectAllChats = () => {
        setSelectedChats([]);
    };

    const handleNext = () => {
        // @ts-ignore
        const text = ExtractText(selectedChats, result.json);
        console.log(text)
    };

    if (content) {
        const jsonData = JSON.parse(content);
        const chatList = jsonData.chatList || [];

        formattedContent = (
            <div>
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        File: user_data_tiktok.json
                    </h3>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="crypto-modal"
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <h3 className="font-semibold text-md mt-4">Chat History with:</h3>
                    <ul className="mt-4 space-y-3">
                        <li  className="mt-1 text-white">

                            <Checkbox
                                aria-label="Select All Chats"
                                classNames={{
                                    base: cn(
                                        "items-center justify-start text-white",
                                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                    ),
                                    label: "w-full text-white",
                                }}
                                isSelected={selectedChats.length === chatList.length && chatList.length > 0}
                                onValueChange={() => {
                                    if (selectedChats.length === chatList.length) {
                                        deselectAllChats();
                                    } else {
                                        selectAllChats();
                                    }
                                }}
                            >
                                {selectedChats.length === chatList.length ? "Deselect All" : "Select All"}
                            </Checkbox>
                        </li>
                    </ul>
                    <ul className="my-4 space-y-3">
                        {chatList.map((chat: string, index: number) => (
                            <li key={index} className="mt-1 text-white">
                                <Checkbox
                                    aria-label={chat}
                                    classNames={{
                                        base: cn(
                                            "items-center justify-start text-white",
                                            "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                        ),
                                        label: "w-full text-white",
                                    }}
                                    isSelected={selectedChats.includes(chat)}
                                    onValueChange={() => handleChatSelect(chat)}
                                >
                                    {chat.replace("Chat History with ", "").replace(":", "")}
                                </Checkbox>
                            </li>
                        ))}
                    </ul>
                    <div className="flex space-x-2">
                        <Button
                            variant="flat"
                            className="bg-foreground text-background px-4 py-2 rounded"
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-y-auto fixed inset-0 flex items-center justify-center z-50 w-full md:inset-0 h-[calc(100%-1rem)] ">
            <div className="relative p-4 w-full max-w-md max-h-full">
                {formattedContent}
            </div>
        </div>
    );
};

export default Modal;
