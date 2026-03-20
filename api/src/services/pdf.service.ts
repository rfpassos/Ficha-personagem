import puppeteer from 'puppeteer';

export interface PdfOptions {
    landscape?: boolean;
    margin?: { top?: string; right?: string; bottom?: string; left?: string };
}

// CSS injetado para corrigir problemas de renderização no Puppeteer:
// backdrop-filter não funciona em headless — substitui pelo fundo sólido equivalente
const PDF_FIX_CSS = `
  /* FIX: backdrop-filter não funciona no Puppeteer headless */
  .info-panel {
    background: rgba(8, 8, 8, 0.92) !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }
  /* Garante que imagens carregam corretamente no PDF */
  img {
    display: block;
    max-width: 100%;
  }
  /* Força renderização correta de cores no PDF */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
`;

export async function generatePdfFromHtml(html: string, options: PdfOptions = {}): Promise<Buffer> {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--enable-features=CSSBackdropFilter',
            '--force-color-profile=srgb',
        ],
    });

    try {
        const page = await browser.newPage();

        // Viewport em A4 landscape (297x210mm @ 96dpi ≈ 1122x794px)
        await page.setViewport({ width: 1122, height: 794, deviceScaleFactor: 2 });

        await page.setContent(html, {
            waitUntil: 'networkidle0',
            timeout: 60000,
        });

        // Injeta correções CSS para PDF
        await page.addStyleTag({ content: PDF_FIX_CSS });

        // Aguarda fontes e imagens carregarem completamente
        await page.evaluate(`document.fonts.ready`);
        await new Promise(r => setTimeout(r, 1000));

        const pdfBuffer = await page.pdf({
            format: 'A4',
            landscape: options.landscape ?? false,
            printBackground: true,
            margin: options.margin ?? {
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
            },
            preferCSSPageSize: true,
        });

        return Buffer.from(pdfBuffer);
    } finally {
        await browser.close();
    }
}
