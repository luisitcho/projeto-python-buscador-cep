document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".js-btn-resultado");
    const inputCep = document.querySelector(".js-input-cep");
    const resultado = document.querySelector(".js-resultado");

    function atualizarBotao() {
        button.disabled = inputCep.value.trim() === "";
    }

    atualizarBotao();

    inputCep.addEventListener("input", atualizarBotao);

    button.addEventListener("click", function () {
        const cep = inputCep.value.trim();

        if (cep === "") return;

        fetch("/consultar-cep", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cep }),
        })
            .then((res) => res.json())
            .then((data) => {
                let html = "";

                resultado.classList.remove("hidden");

                for (const chave in data) {
                    if (data.hasOwnProperty(chave)) {
                        const valor = data[chave];

                        html += `
                            <div class="flex">
                                <strong class="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">${chave}:</strong> 
                                <strong class="font-bold">${valor}</strong>
                            </div>
                        `;
                    }
                }

                resultado.innerHTML = html; // só faz o append uma vez, com todo o conteúdo
            })
            .catch(() => {
                resultado.textContent = "Erro ao consultar o CEP.";
            });
    });
});
