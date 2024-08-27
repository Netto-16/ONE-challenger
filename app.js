const botonEncriptar = document.getElementById("button_encrypt");
const botonDesencriptar = document.getElementById("button_decrypt");
const botonCopiar = document.getElementById("button_copiar");
const textoEntrada = document.getElementById("input_text_encrypt");
const textoSalida = document.getElementById("output_text_decrypt");
const contenedorPadre = document.querySelector(".result");
const alertBox = document.getElementById('custom-alert');
const form = document.getElementById("my_form");

// Función para habilitar botones de encriptar y desencriptar
function habilitarBotones() {
    botonEncriptar.disabled = false;
    botonDesencriptar.disabled = false;
}

// Función para habilitar botón de copiar
function habilitarCopiado() {
    botonCopiar.disabled = false;
}

// Función para mostrar alertas personalizadas
function mostrarAlerta(mensaje) {
    alertBox.innerHTML = mensaje;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 2000); // Oculta la alerta después de 2 segundos
}

// Función para enfocar el área de texto
function enfocarTexto() {
    textoEntrada.focus();
}

// Función para encriptar el mensaje
function encriptarMensaje() {
    const texto = textoEntrada.value.trim();
    if (texto) {
        const regExp = /^[a-z\s]+$/;
        if (regExp.test(texto)) {
            const reemplazos = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" };
            let mensajeEncriptado = texto;
            for (const [key, value] of Object.entries(reemplazos)) {
                mensajeEncriptado = mensajeEncriptado.replace(new RegExp(key, 'gi'), value);
            }
            textoSalida.value = mensajeEncriptado;
            textoSalida.innerHTML = mensajeEncriptado;
            actualizarPagina();
        } else {
            mostrarAlerta("Por favor escribe un texto válido, solo letras minúsculas y espacios.");
            enfocarTexto();
        }
    } else {
        mostrarAlerta("Por favor escribe un texto");
        enfocarTexto();
    }
}

// Función para desencriptar el mensaje
function desencriptarMensaje() {
    const texto = textoEntrada.value.trim();
    if (texto) {
        const reemplazos = { enter: "e", imes: "i", ai: "a", ober: "o", ufat: "u" };
        let mensajeDesencriptado = texto;
        for (const [key, value] of Object.entries(reemplazos)) {
            mensajeDesencriptado = mensajeDesencriptado.replace(new RegExp(key, 'gi'), value);
        }
        textoSalida.value = mensajeDesencriptado;
        textoSalida.innerHTML = mensajeDesencriptado;
        actualizarPagina();
    } else {
        mostrarAlerta("Para desencriptar un mensaje, usa la caja de texto");
        enfocarTexto();
    }
}

// Función para copiar el mensaje al portapapeles
function copiarMensaje() {
    const texto = textoSalida.value.trim();
    if (texto) {
        navigator.clipboard.writeText(texto).then(() => {
            mostrarAlerta("Mensaje copiado");
        }).catch(() => {
            mostrarAlerta("Error al copiar el mensaje");
        });
    } else {
        mostrarAlerta("Nada que copiar");
    }
}

// Función para actualizar la página
function actualizarPagina() {
    if (textoEntrada.value.trim() !== "") {
        contenedorPadre.classList.remove("no_texto");
    }
    enfocarTexto();
}

// Manejo del envío del formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const formData = new FormData(form); // Recopila los datos del formulario

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                Accept: "application/json",
            },
        }); // Envía los datos del formulario

        if (response.ok) {
            mostrarAlerta("¡Gracias por enviar tu consulta!");
            form.reset(); // Vacía el formulario
        } else {
            mostrarAlerta("Ha ocurrido un error al enviar el formulario.");
        }
    } catch (error) {
        mostrarAlerta("Error al enviar el formulario.");
    }
});

// Asignar funciones a los botones
botonEncriptar.addEventListener('click', encriptarMensaje);
botonDesencriptar.addEventListener('click', desencriptarMensaje);
botonCopiar.addEventListener('click', copiarMensaje);
textoEntrada.addEventListener('click', habilitarBotones);
