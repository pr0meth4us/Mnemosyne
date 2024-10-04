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
    const formatTikTokLink = (match: string, p1: string) => {
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
    json: { [key: string]: any },
    me: string
): ChatFile[] {
    const results: ChatFile[] = [];

    for (let i = 0; i < selectedList.length; i++) {
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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css" rel="stylesheet" type="text/css" />
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'dark-bg': '#1e1e2f',
                        'dark-card': '#2e2e42',
                    }
                }
            },
            plugins: [require("daisyui")],
        }
    </script>
    <title>Chat History with ${selectedList[i]}</title>
</head>
<body class="bg-dark-bg text-white">
    <div class="container mx-auto  shadow-lg bg-dark-card">
        <header class="border-b border-gray-700 p-4">
            <div class="flex flex-col items-center">
                <img src="https://raw.githubusercontent.com/pr0meth4us/Mnemosyne/907eb6b438693b9f281afa33b559adecb3c49556/public/images/mnemosyne.svg?token=BCVN6TXZSJT4ACNPV7JNLHTHAA5HS" alt="Mnemosyne logo" class="w-32 h-auto mb-2" />
                <h1 class="text-xl font-semibold">${selectedList[i]}</h1>
            </div>
        </header>
        <div class="p-4 space-y-4 h-[calc(100vh-120px)] overflow-y-auto">
            ${chatContent}
        </div>
    </div>
</body>
</html>`;

            results.push({
                filename: `chat_history_${selectedList[i]}.html`,
                content: chatHtml
            });
        }
    }

    return results;
}
