export const formatTikTokLink = async (match: string): Promise<string> => {
    try {
        // Send a request to the server-side proxy
        const response = await fetch(`/api/tiktok?url=${encodeURIComponent(match)}`);
        const data = await response.json();

        if (!data.success) {
            throw new Error('Failed to fetch TikTok video data');
        }

        const thumbnailUrl = data.thumbnail;

        // Return the formatted HTML with the thumbnail if found
        return `
            <div class="mt-2">
                <a href="${match}" target="_blank" rel="noopener noreferrer" class="block">
                    <div class="bg-gray-800 p-2 rounded-lg flex items-center">
                        ${thumbnailUrl ? `<img src="${thumbnailUrl}" alt="TikTok Thumbnail" class="w-20 h-20 mr-2 rounded-lg"/>` : ''}
                        TikTok Video
                    </div>
                </a>
            </div>`;
    } catch (error) {
        console.error('Error formatting TikTok link:', error);
        return `
            <div class="mt-2">
                <a href="${match}" target="_blank" rel="noopener noreferrer" class="block">
                    <div class="bg-gray-800 p-2 rounded-lg flex items-center">
                        TikTok Video (Error loading thumbnail)
                    </div>
                </a>
            </div>`;
    }
};

export const formatImageLink = (match: string): string => {
    const cleanedMatch = match.replace(/^\[|\]$/g, '').trim();
    return `<div class="mt-2">
        <a href="${cleanedMatch}" target="_blank" rel="noopener noreferrer">
            <img src="${cleanedMatch}" alt="Shared image" class="max-w-full h-auto rounded-lg shadow-md" />
        </a>
    </div>`;
};
