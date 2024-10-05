import ChatHtml from "@/app/utils/ChatHtml";
import ReactDOMServer from 'react-dom/server';
import formatContent from "@/app/utils/formatContent";

interface ChatHistory {
    Date: string;
    From: string;
    Content: string;
}

interface ChatFile {
    filename: string;
    content: string;
}

const text = (chat: ChatHistory, me: string): string => {
    return `
        <div class="chat ${chat.From !== me ? 'chat-start' : 'chat-end'}">
            <div class="chat-header">
                <time class="text-xs text-gray-400 ml-1">${chat.Date}</time>
            </div>
            <div class="chat-bubble bg-gray-700 text-white">
                ${formatContent(chat.Content)}
            </div>
        </div>
    `;
}

export default function ExtractText(
    selectedList: string[],
    json: string ,
    me: string
): ChatFile[] {
    const results: ChatFile[] = [];

    for (let i = 0; i < selectedList.length; i++) {
        const name = selectedList[i].replace("Chat History with ", "").replace(":", "");

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const chatHistory = json?.['Direct Messages']?.['Chat History']?.['ChatHistory']?.[selectedList[i]];

        if (chatHistory) {
            const chatContent = chatHistory.map((chat: ChatHistory) =>
                text(chat, me)
            ).join('');

            const chatHtml = ReactDOMServer.renderToStaticMarkup(<ChatHtml name={name} chatContent={chatContent} />);

            results.push({
                filename: `${name}`,
                content: chatHtml
            });
        }
    }

    return results;
}
