document.addEventListener("DOMContentLoaded", function () {
  function consultarCep() {
    const cep = document.getElementById("cep").value;

    fetch("http://localhost:5000/consultar-cep", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cep }),
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("resultado").textContent = JSON.stringify(
          data,
          null,
          4
        );
      })
      .catch((err) => {
        document.getElementById("resultado").textContent =
          "Erro: " + err.message;
      });
  }

  let button = document.querySelector(".js-btn-resultado");

  button.addEventListener("click", function () {
    consultarCep();
  });
});
