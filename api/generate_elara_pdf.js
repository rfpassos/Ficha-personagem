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
        // Add direct reference for template simplicity
        elara.health_and_defense.hp_current = elara.health_and_defense.current_hp;
        elara.health_and_defense.hp_max = elara.health_and_defense.max_hp;
        elara.armor_class = elara.health_and_defense.armor_class;
        
        // Format all modifiers as strings with signs in the script
        const formatMod = (mod) => {
            if (mod === undefined || mod === null) return "+0";
            const val = parseInt(mod.toString().replace('+', ''));
            return val >= 0 ? `+${val}` : `${val}`;
        };

        elara.initiative = formatMod(elara.health_and_defense.initiative);
        elara.speed = elara.health_and_defense.movement.replace('m', '');
        
        // Ensure bio attributes exist
        const appearance = elara.appearance_and_style;
        appearance.age = appearance.age || "74 anos";
        appearance.height = appearance.height || "1.75m";
        appearance.weight = appearance.weight || "62kg";
        appearance.eyes = appearance.eyes || "Azul Gelo";
        appearance.hair = appearance.hair || "Prateado";
        appearance.skin = appearance.skin || "Alva";

        // Technical Data - Final strings
        elara.passive_perception = formatMod(elara.proficiencies.skill_proficiencies.find(s => s.name === "Percepção")?.modifier);
        elara.passive_investigation = formatMod(elara.proficiencies.skill_proficiencies.find(s => s.name === "Investigação")?.modifier);
        elara.passive_insight = formatMod(elara.proficiencies.skill_proficiencies.find(s => s.name === "Intuição")?.modifier);

        // Format Skills
        elara.proficiencies.skill_proficiencies.forEach(s => {
            s.modifier = formatMod(s.modifier);
        });

        // Map Saving Throws as final strings
        const attrMap = {
            strength: 'FOR',
            dexterity: 'DES',
            constitution: 'CON',
            intelligence: 'INT',
            wisdom: 'SAB',
            charisma: 'CAR'
        };

        elara.saving_throws = Object.keys(elara.attributes).map(attr => ({
            name: attrMap[attr],
            modifier: formatMod(elara.attributes[attr].save),
            proficient: elara.proficiencies.saving_throws.some(s => s.toLowerCase().startsWith(attr.substring(0, 3)))
        }));

        // Attributes with signed modifiers
        elara.attributes_formatted = Object.keys(elara.attributes).map(attr => ({
            key: attrMap[attr],
            value: elara.attributes[attr].value,
            modifier: formatMod(elara.attributes[attr].modifier)
        }));

        // Map features
        elara.features_and_traits = {
            racial_traits: elara.abilities_and_features.racial_traits,
            class_features: elara.abilities_and_features.class_features
        };
        
        // Map Item Proficiencies
        elara.proficiencies.armor_proficiencies = "Nenhuma";
        elara.proficiencies.weapon_proficiencies = "Adagas, dardos, fundas, bordões, besta leve";
        
        // Map feats (using skill proficiencies as highlights for test)
        elara.feats = elara.proficiencies.skill_proficiencies
            .filter(s => s.proficient)
            .map(s => s.name);

        // --- SISTEMA DE SPELL CARDS (ESTUDO + ARTES REALISTAS) ---
        const spellsArtDir = path.resolve(__dirname, '../assets/spells/art');
        const getSpellArt = (name) => {
            const fileName = `${name.toLowerCase().replace(/\s+/g, '_')}.png`;
            const filePath = path.join(spellsArtDir, fileName);
            if (fs.existsSync(filePath)) {
                return 'data:image/png;base64,' + fs.readFileSync(filePath).toString('base64');
            }
            return null;
        };

        const allSpells = (elara.spell_description || []).map(s => ({
            ...s,
            art: getSpellArt(s.name)
        }));
        
        const spellsPerPage = 4; // 4 magias por página (4 frentes em cima, 4 versos embaixo)
        const spellStudyPages = [];

        for (let i = 0; i < allSpells.length; i += spellsPerPage) {
            const pageSpells = allSpells.slice(i, i + spellsPerPage);
            spellStudyPages.push({
                frontRow: pageSpells,
                backRow: pageSpells
            });
        }

        elara.spell_card_pages = spellStudyPages;

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
