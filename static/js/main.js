document.addEventListener("DOMContentLoaded", function () {
    let button = document.querySelector(".js-btn-resultado");
    let inputCep = document.querySelector(".js-input-cep");

    // Função para atualizar estado do botão conforme valor do input
    function atualizarBotao() {
        if (inputCep.value.trim() === "") {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    }

    // Chama ao carregar para definir estado inicial
    atualizarBotao();

    // Adiciona evento input no campo para atualizar botão dinamicamente
    inputCep.addEventListener("input", atualizarBotao);

    button.addEventListener("click", function () {
        consultarCep();
    });

    function consultarCep() {
        const cep = inputCep.value;

        fetch("http://localhost:5000/consultar-cep", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cep }),
        })
            .then((res) => res.json())
            .then((data) => {
                document.getElementById("resultado").textContent =
                    JSON.stringify(data, null, 4);
            })
            .catch((err) => {
                document.getElementById("resultado").textContent =
                    "Erro: " + err.message;
            });
    }
});
