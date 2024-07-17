// Constantes
const form = document.getElementById('contact-form');
const sendBtn = document.getElementById('form-submit-btn');
const resetBtn = document.getElementById('form-reset-btn');
const sinContrasteBtn = document.getElementById('sinContraste-btn');
const conContrasteBtn = document.getElementById('conContraste-btn');
const resultMessage = document.getElementById('resultMessage');

// Funciones
// Añade clases de alto contraste
const contrastOn = () => {
	form.classList.add('contrast-high');
	sendBtn.classList.add('contrast-high-btn');
	resetBtn.classList.add('contrast-high-btn');
	sendResult('Se aplicó el estilo de alto contraste');
};

// Elimina clases de alto contraste
const contrastOff = () => {
	form.classList.remove('contrast-high');
	sendBtn.classList.remove('contrast-high-btn');
	resetBtn.classList.remove('contrast-high-btn');
	sendResult('Se aplicó el estilo por defecto');
};

// Envía mensajes informativos y de errores al usuario
const sendResult = (message) => {
	resultMessage.innerHTML = '';
	const div = document.createElement('div');
	div.innerHTML = `
    <h4 class="message_info">${message}</h4>
    `;
	resultMessage.appendChild(div);
	setTimeout(function () {
		resultMessage.innerHTML = '';
	}, 2000);
};

// Valida el formato del correo electrónico
const validEmail = (emailValue) => {
	const isArroba = emailValue.includes('@');

	if (isArroba) {
		// Divide el email en partes
		const [userMail, domainMail] = emailValue.split('@');
		const [domName, domExt] = domainMail.split('.');

		// Comprueba las partes del email
		if (!userMail || !domainMail || !domName || !domExt) {
			sendResult('El formato del email no es válido');
			return false;
		} else {
			sendResult('El formulario se envió satisfactoriamente');
			return true;
		}
	} else {
		sendResult('El formato del email no es válido');
		return false;
	}
};

// Valida que los campos del formulario no se envíen vacíos
const validField = () => {
	const nameValue = document.getElementById('nombre-input').value;
	const lastNameValue = document.getElementById('apellido-input').value;
	const emailValue = document.getElementById('email-input').value;
	const bornInput = document.getElementById('born-input').value;
	const countryInput = document.getElementById('country-input').value;

	if (
		!nameValue ||
		!lastNameValue ||
		!emailValue ||
		!bornInput ||
		!countryInput
	) {
		sendResult('Todos los campos del formulario son obligatorios');
		return false;
	}
	return true;
};

// Valida que no se ingresen números en los campos de texto
// Se ejecuta directamente en las etiquetas input del tipo text
const removeNumbers = (input) => {
	let content = input.value;
	let numbersRegex = /[0-9]/g; // Expresión regular
	if (numbersRegex.test(content)) {
		content = content.replace(numbersRegex, '');
		input.value = content;
		sendResult(
			'Solo se admiten letras en los campos Nombre, Apellido y País de Residencia'
		);
	}
};

// Manejo de eventos
conContrasteBtn.addEventListener('click', contrastOn);

sinContrasteBtn.addEventListener('click', contrastOff);

resetBtn.addEventListener('click', () => {
	sendResult('Se ha borrado el contenido del formulario satisfactoriamente');
});

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	if (validField()) {
		const emailValue = document.getElementById('email-input').value;

		if (validEmail(emailValue)) {
			sendResult('El formulario se envió satisfactoriamente');
			form.reset();
		}
	}
});
