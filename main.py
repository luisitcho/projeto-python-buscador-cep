from flask import Flask, request, jsonify, render_template
import requests
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Rota para carregar o HTML


@app.route('/')
def index():
    return render_template('index.html')  # templates/index.html

# Rota de consulta ao ViaCEP


@app.route('/consultar-cep', methods=['POST'])
def consultar_cep():
    data = request.get_json()
    cep = data.get('cep', '').strip().replace('-', '')

    print(f"CEP recebido: {cep}")

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
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
