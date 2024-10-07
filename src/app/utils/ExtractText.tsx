import ChatHtml from "@/app/utils/ChatHtml";
import ReactDOMServer from 'react-dom/server';
import formatContent from "@/app/utils/formatContent";


interface ChatFile {
    filename: string;
    content: string;
}


const text = ({ Content, From, Date }: ChatMessage, me: string): string => {
    return `
        <div class="chat ${From !== me ? 'chat-start' : 'chat-end'}">
            <div class="chat-header">
                <time class="text-xs text-gray-400 ml-1">${Date}</time>
            </div>
            <div class="chat-bubble bg-gray-700 text-white">
                ${formatContent(Content)}
            </div>
        </div>
    `;
}

export default function ExtractText(
    { selectedUsers, chatHistories, me }: Params
): ChatFile[] {
    const results: ChatFile[] = [];

    for (let i = 0; i < selectedUsers.length; i++) {
        const userId = selectedUsers[i];
        const chatContent = chatHistories[userId];

        if (chatContent && chatContent.length > 0) {
            const messagesHtml = chatContent.map((msg) =>
                text({ Content: msg.Content, From: msg.From, Date: msg.Date }, me)
            ).join('');


            const chatHtml = ReactDOMServer.renderToStaticMarkup(
                <ChatHtml name={userId} chatContent={messagesHtml} />
            );

            results.push({
                filename: `${userId.match(/with (.+?):/)?.[1]}`,
                content: chatHtml
            });

        }
    }
    return results;
}
