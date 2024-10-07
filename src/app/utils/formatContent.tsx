export default function formatContent(content: string): string {
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
        const cleanedMatch = match.replace(/^\[|]$/g, '');
        return `<div class="mt-2">
            <a href="${cleanedMatch}" target="_blank" rel="noopener noreferrer">
                <img src="${cleanedMatch}" alt="Shared image" class="max-w-full h-auto rounded-lg shadow-md" />
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