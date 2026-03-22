const fs = require('fs');
const file = './assets/data/magias-dnd-ptbr.json';
const data = JSON.parse(fs.readFileSync(file));
const spell = data.find(s => s.SpellName.toLowerCase() === 'teletransporte');
if (spell) {
    spell.Description = `Alvos: Você + até 8 criaturas aliadas voluntárias (ou 1 objeto de até 3m³ não carregado por um inimigo). 
Destino: Um local à sua escolha que obrigatoriamente esteja no mesmo plano de existência.

Como Funciona a Precisão:
A precisão da viagem é definida pelo nível da sua familiaridade e conexão local no momento da conjuração.

1. Sucesso Garantido (Sem rolar dados)
Ocorre apenas quando o jogador consegue provar uma ligação direta (âncora) com o local. 
A viagem vai 100% no alvo estipulado se você possuir:
- Círculo Permanente: O local possui um círculo de teletransporte e você conhece a sequência exata de selos (a 'senha').
- Objeto Associado: Você tem fisicamente em mãos um objeto que foi retirado do local de destino nos últimos 6 meses (ex: um livro sacado da biblioteca daquele castelo).

2. Destino Duvidoso (O Mestre rola 1d100)
Se as condições acima não existirem, a magia passa a depender da sua mente. 
O Mestre jogará 1d100 numa tabela oficial, com as chances de sucesso variando conforme o seu nível de memória:
- Muito Familiar: Chances altas de acerto no alvo (25 a 100). Um local que você foi muitas vezes, estudou ou consegue ver agora.
- Visto Casualmente: Chances médias (54 a 100). Um local que você já passou perto mais de uma vez.
- Visto Uma Vez ou Descrição: Chances baixas (74 a 100). Você só foi no local uma vez (ou viu por magia de vidência), ou nunca foi lá e só o conhece através de mapas ou relatos.
- Destino Falso: Impossível acertar (vai sair fora da rota). Acontece quando local imaginado nunca existiu de verdade como relatado ou simplesmente não existe mais.

Possíveis Efeitos Colaterais do d100 (Erros de Rota):

- No Alvo: A viagem deu certo e vocês estão no exato local seguro.
- Fora do Alvo: A magia falhou um pouco. O grupo sofre um desvio direcional e cai a alguns quilômetros (distância aleatória calculada pelo Mestre) fora de onde queriam chegar.
- Área Similar: O grupo errou de endereço e caiu num lugar que, visualmente e tematicamente, parece muito ao alvo original (ex: caíram na loja de poções do bairro vizinho em vez da guilda).
- Fiasco: Desastre mágico crítico. Todas as criaturas transportadas sofrem imediatamente 3d10 de dano de energia. O Mestre, em seguida, rola novamente o d100 na tabela para tentar definir onde vocês caíram, podendo acumular o dano se um novo Fiasco sair em sequência.
`;
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log('Sucesso');
} else {
    console.log('Nao achou');
}
