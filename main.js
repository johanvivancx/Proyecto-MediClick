document.addEventListener("DOMContentLoaded", () => {

    function normalizar(texto) {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    const searchForm = document.querySelector(".search-form-row");

    if (searchForm) {

        const doctorCards = document.querySelectorAll(".doctor-card");

        const listaDoctores =
            document.querySelector(".doctor-list") ||
            document.querySelector(".doctors-list") ||
            doctorCards[0]?.parentElement;

        let mensajeVacio = document.querySelector(".no-results-message");

        if (!mensajeVacio && listaDoctores) {
            mensajeVacio = document.createElement("div");
            mensajeVacio.className = "no-results-message";
            mensajeVacio.textContent =
                "No se encontraron especialistas con los criterios seleccionados.";
            mensajeVacio.style.display = "none";
            listaDoctores.appendChild(mensajeVacio);
        }

        searchForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const inputs = searchForm.querySelectorAll("input");

            const espQuery = inputs[0]
                ? normalizar(inputs[0].value)
                : "";

            const ciudadQuery = inputs[1]
                ? normalizar(inputs[1].value)
                : "";

            let resultados = 0;

            doctorCards.forEach((card) => {

                const textCard = normalizar(card.textContent);

                const matchEsp =
                    espQuery === "" ||
                    textCard.includes(espQuery);

                const matchCiudad =
                    ciudadQuery === "" ||
                    textCard.includes(ciudadQuery);

                const coincide = matchEsp && matchCiudad;

                if (coincide) {
                    card.style.display = "flex";
                    resultados++;
                } else {
                    card.style.display = "none";
                }
            });

            if (mensajeVacio) {
                if (resultados === 0) {
                    mensajeVacio.style.display = "block";
                } else {
                    mensajeVacio.style.display = "none";
                }
            }
        });
    }

    const formRegistro = document.querySelector(".registro-form");

    if (formRegistro) {

        formRegistro.addEventListener("submit", (e) => {

            const pass = document.getElementById("password")?.value;
            const confirmPass = document.getElementById("confirm-password")?.value;

            if (pass && confirmPass && pass !== confirmPass) {

                e.preventDefault();

                alert("Las contraseñas no coinciden. Por favor, verifica.");

                document
                    .getElementById("confirm-password")
                    .focus();

            } else if (pass && confirmPass) {

                const btn =
                    formRegistro.querySelector("button[type='submit']");

                if (btn) {
                    btn.textContent = "Procesando...";
                    btn.disabled = true;
                    btn.setAttribute("aria-busy", "true");
                }
            }
        });
    }

    const btnHorarios = document.querySelectorAll(
        ".calendario ul li button"
    );

    if (btnHorarios.length > 0) {

        btnHorarios.forEach((btn) => {

            btn.setAttribute("aria-pressed", "false");

            btn.addEventListener("click", () => {

                btnHorarios.forEach((otroBoton) => {
                    otroBoton.classList.remove("horario-seleccionado");
                    otroBoton.setAttribute("aria-pressed", "false");
                });

                btn.classList.add("horario-seleccionado");
                btn.setAttribute("aria-pressed", "true");
            });
        });
    }

    const inputTarjeta = document.getElementById("numero-tarjeta");

    if (inputTarjeta) {

        inputTarjeta.addEventListener("input", (e) => {

            let valor = e.target.value.replace(/\D/g, "");

            valor = valor
                .replace(/(\d{4})/g, "$1 ")
                .trim();

            e.target.value = valor;
        });
    }

    const inputCVV = document.getElementById("codigo-cvv");

    if (inputCVV) {

        inputCVV.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
        });
    }

    const formLogin = document.querySelector(".formulario-login");

    if (formLogin) {

        formLogin.addEventListener("submit", () => {

            const btn =
                formLogin.querySelector("button[type='submit']");

            if (btn) {
                btn.textContent = "Verificando...";
                btn.disabled = true;
                btn.setAttribute("aria-busy", "true");
            }
        });
    }

});