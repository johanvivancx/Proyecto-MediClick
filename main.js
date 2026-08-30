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

    searchForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const especialidad = normalizar(
            document.getElementById("especialidad").value
        );

        const ciudad = normalizar(
            document.getElementById("ciudad").value
        );

        let encontrados = 0;

        doctorCards.forEach((card) => {

            const especialidadDoctor = normalizar(
                card.querySelector(".specialty").textContent
            );

            const ciudadDoctor = normalizar(
                card.querySelector(".hospital").textContent
            );

            const coincideEspecialidad =
                especialidad === "" ||
                especialidadDoctor.includes(especialidad);

            const coincideCiudad =
                ciudad === "" ||
                ciudadDoctor.includes(ciudad);

            if (coincideEspecialidad && coincideCiudad) {
                card.style.setProperty("display", "flex", "important");
                encontrados++;
            } else {
                card.style.setProperty("display", "none", "important");
            }
        });

        let mensaje = document.querySelector(".no-results-message");

        if (!mensaje) {
            mensaje = document.createElement("p");
            mensaje.className = "no-results-message";
            mensaje.textContent =
                "No se encontraron especialistas con esos datos.";

            document.querySelector(".lista").appendChild(mensaje);
        }

        mensaje.style.display =
            encontrados === 0 ? "block" : "none";
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