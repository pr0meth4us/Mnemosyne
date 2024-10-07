import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, message: 'TikTok URL is required' });
    }

    try {
        const response = await axios.get(url, { maxRedirects: 5 });
        const finalUrl = response.request.res.responseUrl || url; // Get the final URL after redirects
        const html = response.data; // Get the response HTML

        // Regex to extract the thumbnail URL
        const thumbnailMatch = html.match(/"originCover":"(.*?)"/);
        const thumbnailUrl = thumbnailMatch ? thumbnailMatch[1].replace(/\\u002F/g, '/') : null;

        // Respond with the thumbnail URL and original URL
        res.status(200).json({
            success: true,
            thumbnail: thumbnailUrl,
            originalUrl: finalUrl,
        });
    } catch (error: any) {
        console.error('Error fetching TikTok video:', error);
        const errorMessage = error.response?.data?.message || 'Error fetching TikTok video'; // Optional chaining for safety
        res.status(500).json({ success: false, message: errorMessage });
    }
}
