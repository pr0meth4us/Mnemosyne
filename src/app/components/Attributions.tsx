"use client";

import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import {FaGithub, FaBrain, FaCoffee, FaRobot} from 'react-icons/fa';
import Image from "next/image";

type AttributionsProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Attributions({ isOpen, onOpen, onClose }: AttributionsProps) {
    return (
        <Modal backdrop="blur" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} className="bg-dark">
            <ModalContent className="overflow-y-auto flex items-center justify-center z-50 w-full md:inset-0 h-[calc(100%-1rem)]">
                <ModalHeader className="flex flex-col gap-1 font-[Montserrat] text-lg text-white">
                    <strong>Attributions</strong>
                </ModalHeader>
                <ModalBody className="text-white font-[Montserrat] space-y-4">
                    <p>This is a sole personal project by <strong>Pr0meth4us</strong>, fueled by coffee, spite, and a
                        random impeccable urge to read old texts.</p>

                    <div>
                        <h2 className="text-xl font-semibold">Acknowledgements</h2>
                        <p>Special thanks to:</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>
                                <strong>My ex</strong> for providing me with the immense motivation to create this
                                (telepathically, <FaBrain className="inline ml-1" title="Telepathy in action"/> cuz like
                                we on no contact).
                            </li>
                            <li>
                                <strong>TikTok</strong> for time bombing our texts.
                            </li>
                            <li><strong>Mnemosyne</strong>, the Greek goddess of memory, for god knows what reason.</li>
                            <li>
                                <FaRobot className="inline mr-1"/>
                                <strong>ChatGPT, Claude, and the whole AI gang</strong>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Technologies Used</h3>
                        <ul className="list-disc list-inside pl-4">
                            <li>
                                <Image
                                    className="inline mr-1 dark:invert"
                                    src="/icons/next-js.svg"
                                    alt="Next.js logo"
                                    width={20}
                                    height={20}
                                />
                                <strong>Next.js</strong> for the web framework.
                            </li>
                            <li>
                                <Image
                                    className="inline mr-1"
                                    src="/icons/apple-touch-icon.png"
                                    alt="NextUI logo"
                                    width={20}
                                    height={20}
                                />
                                <strong>NextUI</strong> for the UI components and styles.
                            </li>
                            <li>
                                <Image
                                    className="inline mr-1"
                                    src="https://img.daisyui.com/images/daisyui-logo/daisyui-logomark.svg"
                                    alt="DaisyUI logo"
                                    width={20}
                                    height={20}
                                />
                                <strong>DaisyUI</strong> for the generated HTML component styles.
                            </li>
                            <li>
                                <Image
                                    className="inline mr-1"
                                    src="/icons/tailwind-icon.svg"
                                    alt="Tailwind CSS logo"
                                    width={20}
                                    height={20}
                                />
                                <strong>Tailwind CSS</strong> for utility-first CSS styling.
                            </li>
                            <li>
                                <FaCoffee className="inline mr-1"/>
                                <strong>Caffeine.js</strong>
                            </li>
                            <li>
                                <FaBrain className="inline mr-1"/>
                                <strong>Telepathy.io</strong> for maintaining no-contact communication with that one ex (may cause uncontrollable urges to text).
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Find Me on GitHub</h3>
                        <a
                            href="https://github.com/pr0meth4us"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-400 hover:underline"
                        >
                            <FaGithub className="mr-2"/>
                            <strong>pr0meth4us</strong>
                        </a>
                    </div>
                </ModalBody>
                <ModalFooter className="flex flex-col items-center">
                    <div className="text-sm text-gray-300 mt-4">
                        © {new Date().getFullYear()} Pr0meth4us. All rights reserved.
                    </div>
                    <Button variant="flat"
                            className="bg-foreground shadow-lg shadow-indigo-500/20 text-white font-[Montserrat]"
                            onPress={onClose}>
                        Close (But the cringe will linger forever)
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
