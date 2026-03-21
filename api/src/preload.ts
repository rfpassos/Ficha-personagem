import dotenv from 'dotenv';
import path from 'path';

// Carrega o .env da raiz do projeto imediatamente
dotenv.config({ path: path.join(__dirname, '../../.env') });
console.log('[PRELOAD] Env loaded from root .env');
