import puppeteer from 'puppeteer';

export interface PdfOptions {
    landscape?: boolean;
    margin?: { top?: string; right?: string; bottom?: string; left?: string };
}

export async function generatePdfFromHtml(html: string, options: PdfOptions = {}): Promise<Buffer> {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
        headless: true,
    });

    try {
        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: 'networkidle0',
            timeout: 30000,
        });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            landscape: options.landscape ?? false,
            printBackground: true,
            margin: options.margin ?? {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm',
            },
        });

        return Buffer.from(pdfBuffer);
    } finally {
        await browser.close();
    }
}
