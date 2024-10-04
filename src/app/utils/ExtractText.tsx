interface ChatHistory {
    Date: string;
    From: string;
    Content: string;
}

interface ChatFile {
    filename: string;
    content: string;
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
                        <time class="text-xs opacity-50">${chat.Date}</time>
                    </div>
                    <div class="chat-bubble">
                        ${chat.Content}
                    </div>
                </div>
            `).join('');

            const chatHtml = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css" rel="stylesheet" type="text/css" />
    <script>
        tailwind.config = {
            theme: {
                extend: {},
            },
            plugins: [require("daisyui")],
        }
    </script>
    <title>Chat History with ${selectedList[i]}</title>
</head>
<body>
    <div class="container mx-auto p-4">
        <h2 class="text-2xl font-semibold mb-4">Chat History with ${selectedList[i]}</h2>
        <div class="space-y-4">
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