
import axios from 'axios';

const API_URL = 'http://localhost:3002/api/v1/sheets';
const API_KEY = 'maestro_test_key_1234567890';

async function testParse() {
  const content = `
# Chun-Li - Ficha de Personagem Humana | Monge 2 / Guerreiro 1 | Nível 3
## 📋 Informações Básicas
* **Nome Completo:** Chun-Li
* **Raça:** Humana
* **Classe:** Monge 2 / Guerreiro 1
  `;

  console.log('Enviando requisição para:', API_URL);
  
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

    console.log('Status de sucesso:', response.status);
    console.log('Resposta:', JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    if (error.response) {
      console.log('Erro Status:', error.response.status);
      console.log('Cabeçalhos da Resposta:', error.response.headers);
      console.log('Corpo da Resposta:', error.response.data);
    } else {
      console.log('Erro Message:', error.message);
    }
  }
}

testParse();
