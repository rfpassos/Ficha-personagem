import pandas as pd
import json
import sys

def extract_spell_data(file_path):
    try:
        df = pd.read_excel(file_path)
        # Assumindo colunas Nome, Escola, Prompt Base
        # Vamos listar as colunas primeiro para garantir
        print(f"Colunas encontradas: {df.columns.tolist()}", file=sys.stderr)
        
        # Converter para lista de dicionários
        all_spells = df.to_dict(orient='records')
        print(json.dumps(all_spells, indent=4, ensure_ascii=False))
    except Exception as e:
        print(f"Erro: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    extract_spell_data(r"c:\Projetos\Ficha-personagem\assets\templates\Lista e Descrições de Magias D&D.xlsx")
