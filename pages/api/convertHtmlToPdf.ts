import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '30mb',
        },
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { htmlContent, name } = req.body;

    if (!htmlContent) {
        return res.status(400).json({ error: 'HTML content is required' });
    }

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${name}`);
        const pdfStream = await page.pdf({ format: 'A4', printBackground: true });
        res.end(pdfStream);
        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
    }
}