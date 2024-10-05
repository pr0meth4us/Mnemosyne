import Image from "next/image";
import Uploader from "./components/Uploader";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center w-full">
                <Image
                    src="/images/mnemosyne-dirt.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                />
                <Uploader/>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="text-divine text-xs flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://github.com/pr0meth4us"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    © mnemosyne by Pr0meth4us
                </a>

            </footer>

        </div>
    );
}
