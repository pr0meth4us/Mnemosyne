"use client"; // Indicate this is a Client Component

import Uploader from "./components/Uploader";
import Instruction from "@/app/components/Instruction";
import { useState } from "react";
import Attributions from "@/app/components/Attributions";
import { useDisclosure } from "@nextui-org/modal"; // Ensure the import path is correct

export default function Home() {
    const [isUploaderVisible, setUploaderVisible] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure(); // Correctly destructure onClose

    const handleToggleUploader = () => {
        setUploaderVisible((prev) => !prev);
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center w-full">
                <Uploader
                    isVisible={isUploaderVisible}
                    onTriggerUploader={handleToggleUploader}
                />
                <Instruction
                    isVisible={!isUploaderVisible}
                    onTriggerUploader={handleToggleUploader}
                />
                <Attributions isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> {/* Pass the correct props */}
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    role="button"
                    className="text-divine text-xs flex items-center gap-2 hover:underline hover:underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onOpen} // Call the onOpen function directly
                >
                    © mnemosyne by Pr0meth4us
                </a>
            </footer>
        </div>
    );
}
