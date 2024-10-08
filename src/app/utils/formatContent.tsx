export const formatTikTokLink = async (match: string): Promise<string> => {
    try {
        const response = await fetch('/api/tikTok', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: match }),
        });

        const data = await response.json();
        const thumbnailUrl = data.thumbnail;

        return `
            <div class="mt-2">
                <a href="${match}" target="_blank" rel="noopener noreferrer" class="block">
                    <div class="bg-gray-900 rounded-lg overflow-hidden relative ${thumbnailUrl ? 'h-50' : 'p-4'}">
                        ${thumbnailUrl ? `
                             <div class="w-full h-full flex items-center justify-center relative">
                              <img src="${thumbnailUrl}" alt="TikTok Thumbnail" class="w-full h-full object-cover" />
                              <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div class="w-16 h-16 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                        ` : `
                            <div class="flex items-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-lg font-semibold">TikTok Video</span>
                            </div>
                        `}
                    </div>
                </a>
            </div>`;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return `
            <div class="mt-2">
                <a href="${match}" target="_blank" rel="noopener noreferrer" class="block">
                    <div class="bg-gray-800 p-2 rounded-lg flex items-center">
                        TikTok Video
                    </div>
                </a>
            </div>`;
    }
};

export const formatImageLink = (match: string): string => {
    const cleanedMatch = match.replace(/^\[|\]$/g, '').trim();
    return `
        <div class="mt-2">
            <a href="${cleanedMatch}" target="_blank" rel="noopener noreferrer">
                <img src="${cleanedMatch}" alt="Shared image" class="max-w-full max-h-[300px] w-auto h-auto object-contain rounded-lg shadow-md" />
            </a>
        </div>`;
};