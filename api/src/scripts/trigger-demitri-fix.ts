import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

async function main() {
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({ connectionString });
    
    try {
        await client.connect();
        
        // 1. Usar o prefixo conhecido
        const apiKey = 'rgs_final_test_key_2025';
        console.log(`Usando API Key: ${apiKey}`);

        // 2. Disparar o Job
        const mdPath = 'c:\\Projetos\\Ficha-personagem\\tmp\\Demitri Maximoff.md';
        const content = fs.readFileSync(mdPath, 'utf8');

        console.log('Enviando requisição POST /api/v1/sheets...');
        const API_URL = 'http://localhost:3000/api/v1/sheets';
        const response = await axios.post(API_URL, {
            content: content
        }, {
            headers: { 'x-api-key': apiKey }
        });

        const jobId = response.data.jobId;
        console.log(`JOB_CREATED:${jobId}`);

        // 3. Polling do status
        console.log('Aguardando processamento...');
        let status = 'PENDING';
        let pdfUrl = '';
        
        for (let i = 0; i < 30; i++) {
            await new Promise(r => setTimeout(r, 5000));
            const statusRes = await axios.get(`http://localhost:3000/api/v1/sheets/${jobId}`, {
                headers: { 'x-api-key': apiKey }
            });
            
            status = statusRes.data.status;
            console.log(`Tentativa ${i+1}: Status = ${status}`);
            
            if (status === 'SUCCESS') {
                pdfUrl = statusRes.data.downloadUrl;
                break;
            } else if (status === 'FAILED') {
                console.error('Job falhou:', statusRes.data.error);
                break;
            }
        }

        if (status === 'SUCCESS') {
            console.log('--- REGERACAO_SUCESSO ---');
            console.log(`NOVA_URL:${pdfUrl}`);
        } else {
            console.error('Timeout ou erro na regeneração.');
        }

    } catch (err: any) {
        console.error('Erro:', err.response?.data || err.message);
    } finally {
        await client.end();
    }
}

main();
