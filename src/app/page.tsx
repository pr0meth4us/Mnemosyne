import Image from "next/image";
import Uploader from "./components/Uploader";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center w-full">
                <Image
                    src="/images/mnemosyne.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                />
                <Uploader/>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    © Odyssey by Prometheus
                </a>
            </footer>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin,
                    <br/>
                    I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
        </div>
    );
}
