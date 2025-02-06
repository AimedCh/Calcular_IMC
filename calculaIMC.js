// Esperamos a que la página se cargue completamente
window.addEventListener("load", inicio, false);

function inicio() {
  document
    .getElementById("calcular")
    .addEventListener("click", function (event) {
      event.preventDefault();

      let nombre = document.getElementById("nombre").value.trim();
      let peso = parseInt(document.getElementById("peso").value.trim(), 10);
      let estatura = parseInt(
        document.getElementById("estatura").value.trim(),
        10
      );

      if (
        nombre === "" ||
        isNaN(peso) ||
        isNaN(estatura) ||
        peso <= 0 ||
        estatura <= 0
      ) {
        mostrarResultado("Por favor, ingrese datos válidos.", "error"); // Mostrar error
        return;
      }

      let datos = new FormData();
      datos.append("nombre", nombre);
      datos.append("peso", peso);
      datos.append("estatura", estatura);

      // Realizar solicitud AJAX al servidor
      fetch("calculaIMC.php", {
        method: "POST",
        body: datos,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la respuesta del servidor.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.type === "success") {
            mostrarResultado(data.status_message, "success");
          } else {
            mostrarResultado(data.status_message, "error");
          }
        })
        .catch((error) => {
          mostrarResultado("Hubo un error al calcular el IMC.", "error");
          console.error("Error:", error);
        });
    });
}

function mostrarResultado(mensaje, tipo) {
  let contenedor = document.getElementById("contenedor");

  contenedor.className = "mt-8 text-center font-semibold";

  if (tipo === "success") {
    contenedor.classList.add("text-green-600");
  } else if (tipo === "error") {
    contenedor.classList.add("text-red-600");
  }
  contenedor.innerHTML = `<p>${mensaje}</p>`;
  contenedor.classList.remove("hidden");
}
