import ChatHtml from "@/app/utils/ChatHtml";
import ReactDOMServer from 'react-dom/server';
import { formatTikTokLink, formatImageLink } from "@/app/utils/formatContent";

const text = async ({ Content, From, Date }: ChatMessage, me: string): Promise<string> => {
    let formattedContent = '';
    const tikTokLinkMatch = Content.match(/(https:\/\/(?:www\.)?tiktokv\.com\/[@\w\/\-]+)/);
    const imageLinkMatch = Content.match(/(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|webp))/i);

    if (tikTokLinkMatch) {
        formattedContent = await formatTikTokLink(tikTokLinkMatch[0]);
    } else if (imageLinkMatch) {
        formattedContent = formatImageLink(imageLinkMatch[0]);
    } else {
        formattedContent = Content;
    }

    return `
        <div class="chat ${From !== me ? 'chat-start' : 'chat-end'}">
            <div class="chat-header">
                <time class="text-xs text-gray-400 ml-1">${Date}</time>
            </div>
            <div class="chat-bubble bg-gray-700 text-white">
                ${formattedContent}
            </div>
        </div>
    `;
};

export default async function ExtractText(
    { selectedUsers, chatHistories, me }: Params
): Promise<ChatFile[]> {
    const results: ChatFile[] = [];

    for (const userId of selectedUsers) {
        const chatContent = chatHistories[userId];

        if (chatContent && chatContent.length > 0) {
            const messagesHtmlPromises = chatContent.map(msg =>
                text({ Content: msg.Content, From: msg.From, Date: msg.Date }, me)
            );
            const messagesHtml = await Promise.all(messagesHtmlPromises);

            const chatHtml = ReactDOMServer.renderToStaticMarkup(
                <ChatHtml name={userId} chatContent={messagesHtml.join('')} />
            );

            results.push({
                filename: `${userId.match(/with (.+?):/)?.[1]}`,
                content: chatHtml
            });
        }
    }
    return results;
}