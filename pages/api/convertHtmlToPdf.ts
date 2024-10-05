import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

export const config = {
    api: {
        bodyParser: false, // Disable body parsing to handle large requests via streaming
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        let htmlContent = '';
        const { name } = req.query;

        // Handle streamed incoming data (from a POST request body)
        await new Promise((resolve, reject) => {
            req.on('data', (chunk) => {
                htmlContent += chunk.toString();
            });
            req.on('end', resolve);
            req.on('error', reject);
        });

        if (!htmlContent) {
            return res.status(400).json({ error: 'HTML content is required' });
        }

        // Launch puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${name}`);

        // Generate PDF as a stream
        const pdfStream = await page.createPDFStream({ format: 'A4', printBackground: true });

        // Use pipeline to handle the stream, and send to the client response
        await streamPipeline(pdfStream, res);

        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
        return res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
    }
}
