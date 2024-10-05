interface ChatHistory {
    Date: string;
    From: string;
    Content: string;
}

interface ChatFile {
    filename: string;
    content: string;
}

function formatContent(content: string): string {
    const formatTikTokLink = (match: string) => {
        return `<div class="mt-2">
            <a href="${match}" target="_blank" rel="noopener noreferrer" class="block">
                <div class="bg-gray-800 p-2 rounded-lg flex items-center">
                    <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    TikTok Video
                </div>
            </a>
        </div>`;
    };

    const formatImageLink = (match: string) => {
        return `<div class="mt-2">
            <a href="${match}" target="_blank" rel="noopener noreferrer">
                <img src="${match}" alt="Shared image" class="max-w-full h-auto rounded-lg shadow-md" />
            </a>
        </div>`;
    };

    content = content.replace(
        /(https:\/\/(?:www\.)?tiktokv\.com\/[@\w\/\-]+)/g,
        formatTikTokLink
    );

    content = content.replace(
        /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|webp))/gi,
        formatImageLink
    );

    return content;
}

export default function ExtractText(
    selectedList: string[],
    json: { [key: string]: string },
    me: string
): ChatFile[] {
    const results: ChatFile[] = [];

    for (let i = 0; i < selectedList.length; i++) {
        const name = selectedList[i].replace("Chat History with ","").replace(":","");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const chatHistory = json?.['Direct Messages']?.['Chat History']?.['ChatHistory']?.[selectedList[i]];

        if (chatHistory) {
            const chatContent = chatHistory.map((chat: ChatHistory) => `
                <div class="chat ${chat.From !== me ? 'chat-start' : 'chat-end'}">
                    <div class="chat-header">
                        <time class="text-xs text-gray-400 ml-1">${chat.Date}</time>
                    </div>
                    <div class="chat-bubble bg-gray-700 text-white">
                        ${formatContent(chat.Content)}
                    </div>
                </div>
            `).join('');

            const chatHtml = `
<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css" rel="stylesheet" type="text/css" />
    <script>
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
    </script>
    <style>
        body {
            font-family: 'Jost', sans-serif;
        }
    </style>
    <title>${selectedList[i]}</title>
</head>
<body class="bg-dark-bg text-white h-full flex flex-col">
    <div class="flex-grow flex flex-col overflow-hidden">
        <header class="border-b border-gray-700 p-4 flex-shrink-0">
            <div class="flex flex-col items-center">
                <img src="https://raw.githubusercontent.com/pr0meth4us/svg/7015de0542e26877d6b47d183599b634d4b9d079/mnemosyne.svg" alt="Mnemosyne logo" class="w-20 h-auto mb-2" />
                <h1 class="text-xl font-semibold">${name}</h1>
            </div>
        </header>
        <div class="mx-auto flex-grow overflow-y-auto p-4 space-y-4">
            ${chatContent}
        </div>
    </div>
    <footer class="flex-shrink-0 p-4 flex gap-6 flex-wrap items-center justify-center border-t border-gray-700">
        <a
            class="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/pr0meth4us"
            target="_blank"
            rel="noopener noreferrer"
        >
            © mnemosyne by Pr0meth4us
        </a>
    </footer>
</body>
</html>`;

            results.push({
                filename: `${selectedList[i]}.html`,
                content: chatHtml
            });
        }
    }

    return results;
}
