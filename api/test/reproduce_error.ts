
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/sheets';
const API_KEY = 'sua_api_key_aqui'; // Preciso descobrir uma chave válida no banco

async function testParse() {
  const content = `
# Chun-Li - Ficha de Personagem Humana | Monge 2 / Guerreiro 1 | Nível 3
## 📋 Informações Básicas
* **Nome Completo:** Chun-Li
* **Raça:** Humana
* **Classe:** Monge 2 / Guerreiro 1
  `;

  try {
    const response = await axios.post(API_URL, {
      contentType: 'markdown',
      content: content
    }, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('Status:', response.status);
    console.log('Data:', response.data);
  } catch (error: any) {
    if (error.response) {
      console.log('Error Status:', error.response.status);
      console.log('Error Data:', error.response.data);
    } else {
      console.log('Error Message:', error.message);
    }
  }
}

testParse();
