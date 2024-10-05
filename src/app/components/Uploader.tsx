"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import ReadFile from "@/app/utils/ReadFile";
import Modal from "./Modal";

export default function Uploader() {
    const [isUploaderVisible, setUploaderVisible] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalContent, setModalContent] = useState<{ people: string; json: string; me: string}>({
        people: '',
        json: '',
        me: ''
    });
    const [isModalOpen, setModalOpen] = useState(false);

    const handleUploadClick = () => {
        setUploaderVisible((prev) => !prev);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleCancelUpload = () => {
        setUploadedFile(null);
    };

    const handleSubmit = () => {
        if (uploadedFile) {
            setIsLoading(true);
            ReadFile(uploadedFile).then((result) => {
                setIsLoading(false);
                setModalContent(result);
                setModalOpen(true);
            });
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            {!isModalOpen && (
                <div className={`flex flex-col row-start-2 items-center`}>
                    <div className="flex items-center flex-col sm:flex-row w-full">
                        <button
                            className={`${
                                isUploaderVisible ? 'w-full rounded-t-2xl' : 'justify-center rounded-full'
                            } w-full border border-solid border-transparent transition-colors flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5x`}
                            onClick={handleUploadClick}
                        >
                            <Image
                                className={`transition-transform fill-divine duration-500 ${
                                    isUploaderVisible ? 'rotate-180' : ''
                                }`}
                                src="https://nextjs.org/icons/vercel.svg"
                                alt="Vercel logomark"
                                width={20}
                                height={20}
                            />
                            {isUploaderVisible ? "Close" : "Upload"}
                        </button>
                    </div>

                    {isUploaderVisible && (
                        <div
                            className={`flex items-center justify-center w-80 ${isDragging ? 'border-blue-400' : 'border-gray-300'}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <label
                                htmlFor="dropzone-file"
                                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 rounded-t-none ${
                                    isDragging ? 'bg-gray-200 dark:bg-gray-600' : ''
                                }`}
                            >
                                <div className="text-divine flex flex-col items-center justify-center pt-5 pb-6">
                                    {!uploadedFile ? (
                                        <>
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                JSON or TXT (TikTok formatted)
                                            </p>
                                        </>
                                    ) : (
                                        <div className="inline-flex items-center">
                                            <p className="text-center">File: {uploadedFile.name}
                                                <button
                                                    className="text-red-600 w-7 h-7 items-center justify-center ml-1 border-2 border-red-600 rounded-full"
                                                    onClick={handleCancelUpload}
                                                >
                                                    &times;
                                                </button>
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    accept=".json,.txt"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    )}

                    {uploadedFile && isUploaderVisible && (
                        <div className="flex justify-end w-full mt-4">
                            <Button
                                variant="flat"
                                className="bg-foreground text-background px-4 py-2 rounded"
                                onClick={handleSubmit}
                                isLoading={isLoading}
                            >
                                Submit
                            </Button>
                        </div>
                    )}

                </div>
            )}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                result={modalContent}
            />
        </div>
    );
}
