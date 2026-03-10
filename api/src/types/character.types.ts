export interface CharacterAttributes {
    forca: number;
    destreza: number;
    constituicao: number;
    inteligencia: number;
    sabedoria: number;
    carisma: number;
}

export interface CharacterInput {
    nome: string;
    raca: string;
    classe: string;
    nivel: number;
    background?: string;
    alinhamento?: string;
    aparencia?: string;
    personalidade?: string;
    atributos: CharacterAttributes;
    habilidades?: string[];
    magias?: string[];
    equipamentos?: string[];
    historia?: string;
    pontos_de_vida?: number;
    classe_armadura?: number;
}
