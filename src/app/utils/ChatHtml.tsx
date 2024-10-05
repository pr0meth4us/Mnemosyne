import React from 'react';

interface ChatHtmlProps {
    name: string;
    chatContent: string;
}

const ChatHtml: React.FC<ChatHtmlProps> = (props) => {
    const { name, chatContent } = props;

    return (
        <>
            <html lang="en" className="h-full">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css" rel="stylesheet" type="text/css" />
                <script>
                    {`
                        tailwind.config = {
                            theme: {
                                extend: {
                                    colors: {
                                        'dark-bg': '#1e1e2f',
                                        'dark-card': '#2e2e42',
                                    },
                                    fontFamily: {
                                        'sans': ['Jost', 'sans-serif'],
                                    },
                                }
                            },
                            plugins: [require("daisyui")],
                        }
                    `}
                </script>
                <style>
                    {`
                        body {
                            font-family: 'Jost', sans-serif;
                        }
                    `}
                </style>
                <title>{name}</title>
            </head>
            <body className="bg-dark-bg text-white flex flex-col min-h-screen">
            <div className="flex-grow flex flex-col">
                <header className="border-b border-gray-700 p-4 flex-shrink-0">
                    <div className="flex flex-col items-center">
                        <img src="https://raw.githubusercontent.com/pr0meth4us/svg/7015de0542e26877d6b47d183599b634d4b9d079/mnemosyne.svg" alt="Mnemosyne logo" className="w-20 h-auto mb-2" />
                        <h1 className="text-xl font-semibold">{name}</h1>
                    </div>
                </header>
                <div className="mx-auto flex-grow p-4 space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: chatContent }} />
                </div>
            </div>
            <footer className="flex-shrink-0 p-4 flex gap-6 flex-wrap items-center justify-center border-t border-gray-700">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://github.com/pr0meth4us"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    © mnemosyne by Pr0meth4us
                </a>
            </footer>
            </body>
            </html>
        </>
    );
};

export default ChatHtml;
