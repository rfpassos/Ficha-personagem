const fs = require('fs');
const path = require('path');
const Handlebars = require('./node_modules/handlebars');
const puppeteer = require('./node_modules/puppeteer');

// Helpers
Handlebars.registerHelper('gt', function(a, b) {
    return Number(a) > Number(b);
});

async function run() {
    try {
        const elaraPath = path.resolve(__dirname, '../assets/sheets/Elara Menrva-DnD.json');
        const templatePath = path.resolve(__dirname, '../assets/templates/dnd-landscape-hero.html');
        const imagePath = 'C:/Users/rfpas/.gemini/antigravity/brain/ec5cd458-6abf-4163-849c-aef99b1d1d97/elara_menrva_landscape_portrait_1773178685463.png';

        const elara = JSON.parse(fs.readFileSync(elaraPath, 'utf8'));
        const templateSource = fs.readFileSync(templatePath, 'utf8');
        const imageData = fs.readFileSync(imagePath).toString('base64');

        // Remapping for template
        elara.appearance_and_style.image_file = 'data:image/png;base64,' + imageData;
        elara.subclass = elara.basic_info.archetype;
        elara.hit_points = { 
            current: elara.health_and_defense.current_hp, 
            max: elara.health_and_defense.max_hp 
        };
        elara.armor_class = elara.health_and_defense.armor_class;
        elara.initiative = parseInt(elara.health_and_defense.initiative.toString().replace('+', '')) || 0;
        
        // Clean attribute values and modifiers to be numbers
        Object.keys(elara.attributes).forEach(attr => {
            elara.attributes[attr].value = parseInt(elara.attributes[attr].value);
            elara.attributes[attr].modifier = parseInt(elara.attributes[attr].modifier.toString().replace('+', ''));
        });

        // Map features
        elara.features_and_traits = {
            racial_traits: elara.abilities_and_features.racial_traits,
            class_features: elara.abilities_and_features.class_features
        };
        
        // Map feats (using skill proficiencies as highlights for test)
        elara.feats = elara.proficiencies.skill_proficiencies
            .filter(s => s.proficient)
            .map(s => s.name);

        const template = Handlebars.compile(templateSource);
        const html = template(elara);

        const htmlPath = path.resolve(__dirname, '../assets/templates/elara-test.html');
        fs.writeFileSync(htmlPath, html);
        console.log('HTML gerado: ' + htmlPath);

        // Generate PDF
        const browser = await puppeteer.launch({ 
            headless: 'new', 
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--font-render-hinting=none'
            ] 
        });
        const page = await browser.newPage();
        
        // Use screen media to avoid print styles hiding elements
        await page.emulateMediaType('screen');
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        // Extra wait for fonts and glassmorphism
        // Injeta CSS corretivo para garantir visibilidade no PDF
        await page.addStyleTag({
            content: `
                .info-panel {
                    background: rgba(0, 0, 0, 0.8) !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    z-index: 9999 !important;
                }
                .hero-background::after {
                    display: none !important;
                }
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            `
        });

        await new Promise(r => setTimeout(r, 2000));
        
        // Screenshot for debugging
        const screenshotPath = 'C:/Users/rfpas/.gemini/antigravity/brain/ec5cd458-6abf-4163-849c-aef99b1d1d97/elara_rendering_proof.png';
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log('Screenshot de depuração gerado: ' + screenshotPath);
        
        const pdfPath = path.resolve(__dirname, '../assets/sheets/Elara_Menrva_Ficha_Completa_MultiPage.pdf');
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            displayHeaderFooter: false
        });
        
        await browser.close();
        console.log('PDF gerado: ' + pdfPath);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();
