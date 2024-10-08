"use client";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
type InstructionProps = {
    onTriggerUploader: () => void;
    isVisible: boolean
};
export default function Instruction({ onTriggerUploader, isVisible }:InstructionProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {isVisible && (
                <div className="text-center">
                    <a
                        className="text-white text-sm hover:underline hover:underline-offset-4 cursor-pointer"
                        onClick={onOpen}
                    >
                        Need help? Click here for instructions.
                    </a>
                </div>
            )}
            <Modal backdrop="blur" scrollBehavior="inside" isOpen={isOpen} onClose={onOpenChange} className="bg-dark">
                <ModalContent
                    className="overflow-y-auto flex items-center justify-center z-50 w-full md:inset-0 h-[calc(100%-1rem)]">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-[Montserrat] text-lg text-white">
                                <strong>Mnemosyne: Keeper of Memories</strong>
                            </ModalHeader>
                            <ModalBody className="text-white font-[Montserrat] space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        <strong>Listen closely, mortal, to the power of Mnemosyne, the divine protector of fleeting words!</strong>
                                    </h2>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">
                                        <strong>The Goddess&#39;s Sacred Promise:</strong>
                                    </h3>
                                    <ul className="list-disc list-inside pl-4">
                                        <li><strong>Everything happens within your own device (browser).</strong></li>
                                        <li><strong>Your words are never sent to distant servers.</strong></li>
                                        <li><strong>Your sacred text is not stored or saved in a permanent database.</strong></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">
                                        <strong>The Goddess&#39;s Gift:</strong>
                                    </h3>
                                    <p>
                                        Mnemosyne <strong>rescues disappearing conversations from TikTok</strong>, giving them new life.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">
                                        <strong>How to Call Upon Mnemosyne:</strong>
                                    </h3>
                                    <p>To summon her power, you need:</p>
                                    <ul className="list-disc list-inside pl-4">
                                        <li><strong>Your TikTok data in JSON or TXT format.</strong></li>
                                    </ul>
                                    <p>
                                        If you don’t know how to get this:
                                        <a href="https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data" className="text-blue-400 underline ml-2">
                                            <strong>Click here to learn how</strong>
                                        </a>.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">
                                        <strong>The Ritual Process:</strong>
                                    </h3>
                                    <ol className="list-decimal list-inside pl-4">
                                        <li><strong>Upload your TikTok file: Click &#34;Choose File&#34; or drag and drop your JSON or TXT file.</strong></li>
                                        <li><strong>Watch as Mnemosyne transforms your forgotten words</strong> into:
                                            <ul className="list-disc list-inside pl-4">
                                                <li>Bright, readable <strong>HTML pages</strong> (best viewed on larger screens).</li>
                                                <li>Timeless <strong>PDF documents</strong>.</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" className="bg-foreground shadow-lg shadow-indigo-500/20 text-white font-[Montserrat]" onPress={() => { onClose(); onTriggerUploader(); }}>
                                    Ready to start?
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
