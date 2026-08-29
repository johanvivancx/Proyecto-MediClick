document.addEventListener("DOMContentLoaded", () => {
    function normalizar(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    const searchForm = document.querySelector(".search-form-row");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputs = searchForm.querySelectorAll("input");
            const espQuery = inputs[0] ? normalizar(inputs[0].value) : "";
            const ciudadQuery = inputs[1] ? normalizar(inputs[1].value) : "";
            
            const doctorCards = document.querySelectorAll(".doctor-card");
            doctorCards.forEach(card => {
                const textCard = normalizar(card.textContent);
                const matchEsp = espQuery === "" || textCard.includes(espQuery);
                const matchCiudad = ciudadQuery === "" || textCard.includes(ciudadQuery);
                
                if (matchEsp && matchCiudad) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
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
                document.getElementById("confirm-password").focus();
            } else if (pass && confirmPass) {
                const btn = formRegistro.querySelector("button[type='submit']");
                if (btn) {
                    btn.textContent = "Procesando...";
                    btn.style.opacity = "0.7";
                    btn.style.pointerEvents = "none";
                }
            }
        });
    }

    const btnHorarios = document.querySelectorAll(".calendario ul li button");
    if (btnHorarios.length > 0) {
        btnHorarios.forEach(btn => {
            btn.addEventListener("click", () => {
                btnHorarios.forEach(b => {
                    b.style.backgroundColor = "var(--white)";
                    b.style.color = "var(--text-dark)";
                    b.style.borderColor = "#e2e8f0";
                });
                btn.style.backgroundColor = "var(--primary-blue)";
                btn.style.color = "var(--white)";
                btn.style.borderColor = "var(--primary-blue)";
            });
        });
    }

    const inputTarjeta = document.getElementById("numero-tarjeta");
    if (inputTarjeta) {
        inputTarjeta.addEventListener("input", (e) => {
            let valor = e.target.value.replace(/\D/g, "");
            valor = valor.replace(/(\d{4})/g, "$1 ").trim();
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
            const btn = formLogin.querySelector("button[type='submit']");
            if (btn) {
                btn.textContent = "Verificando...";
                btn.style.opacity = "0.7";
                btn.style.pointerEvents = "none";
            }
        });
    }
});