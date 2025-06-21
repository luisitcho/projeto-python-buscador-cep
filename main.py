from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Libera o acesso do front-end


@app.route('/consultar-cep', methods=['POST'])
def consultar_cep():
    data = request.get_json()
    cep = data.get('cep', '').strip().replace('-', '')

    print(f"CEP recebido: {cep}")  # Log para depuração
    if not cep:
        return jsonify({'erro': 'CEP não informado'}), 400

    if not cep.isdigit() or len(cep) != 8:
        return jsonify({'erro': 'CEP inválido'}), 400

    url = f'https://viacep.com.br/ws/{cep}/json/'

    try:
        response = requests.get(url)
        response.raise_for_status()
        resultado = response.json()

        if 'erro' in resultado:
            return jsonify({'erro': 'CEP não encontrado'}), 404

        return jsonify(resultado)

    except requests.RequestException:
        return jsonify({'erro': 'Erro ao acessar o ViaCEP'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
