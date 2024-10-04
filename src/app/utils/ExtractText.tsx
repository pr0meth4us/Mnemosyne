interface ChatHistory {
    Date: string;
    From: string;
    Content: string;
}

export default function ExtractText(selectedList: string[], json: { [key: string]: any }, me: string) {
    const results: string[] = [];

    for (let i = 0; i < selectedList.length; i++) {
        const chatHistory = json?.['Direct Messages']?.['Chat History']?.['ChatHistory']?.[selectedList[i]];
        console.log(me)

        if (chatHistory) {
            const chatHtml = `
                <div>
                    <h2 class="text-2xl font-semibold">Chat History with ${selectedList[i]}</h2>
                        ${chatHistory.map((chat: ChatHistory) => `
                            <div class="${chat.From !== me ? 'chat-start' : 'chat-end'}">
                                <div class="chat-header">
                                    ${chat.From} <time class="text-xs opacity-50">${chat.Date}</time>
                                </div>
                                <div class="chat-bubble">
                                    ${chat.Content}
                                </div>
                            </div>
                        `).join('')}
                </div>`;
            results.push(chatHtml);
        }
    }

    if (results.length) {
        return `
            <html lang="en">
            <head>
                <title>Chat History</title>
                <link href="https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.css" rel="stylesheet">
            </head>
            <body>
                ${results.join('')}
            </body>
            </html>
        `;
    }

    return null;
}
