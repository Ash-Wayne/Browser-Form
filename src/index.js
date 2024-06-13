import './styles.css';

const form = document.querySelector('form');
const email = document.getElementById('email');
const country = document.getElementById('country');
const countriesOptions = Array.from(document.getElementById('countries').options);
const zip = document.getElementById('zip');
const password = document.getElementById('password');
const confPassword = document.getElementById('conf-password');
const emailValidation = document.getElementById('email-validation');
const countryValidation = document.getElementById('country-validation');
const zipValidation = document.getElementById('zip-validation');
const passValidation = document.getElementById('pass-validation');
const confPassValidation = document.getElementById('conf-pass-validation');
const passwordErrorsDiv = document.querySelector('.password-errors-div');
const capitalLetterRule = document.getElementById('capital-letter-rule');
const smallLetterRule = document.getElementById('small-letter-rule');
const numberRule = document.getElementById('number-rule');
const specialCharacterRule = document.getElementById('special-character-rule');
const lengthRule = document.getElementById('length-rule');

(function setPatternForCountry() {
	let countriesPattern = '^(';

	for (let countryOption of countriesOptions) {
		countriesPattern = countriesPattern + '|' + countryOption.value;
	}

	countriesPattern = (countriesPattern + ')$').replace('|', '');
	country.setAttribute('pattern', countriesPattern);
})();

(function addListenersToFormFields() {
	email.addEventListener('change', () => {
		if (email.validity.valid) {
			emailValidation.textContent = '';
			email.className = '';
		} else {
			showEmailError();
		}
	});

	country.addEventListener('change', () => {
		if (country.validity.valid) {
			countryValidation.textContent = '';
			country.className = '';
		} else {
			showCountryError();
		}
	});

	zip.addEventListener('change', () => {
		if (zip.validity.valid) {
			zipValidation.textContent = '';
			zip.className = '';
		} else {
			showZipError();
		}
	});

	password.addEventListener('input', () => {
		if (checkPassword()) {
			passValidation.textContent = '';
			password.className = '';
		} else {
			showPasswordError();
		}
	});

	confPassword.addEventListener('change', () => {
		if (checkPasswordMatch()) {
			confPassValidation.textContent = '';
			confPassword.className = '';
		} else {
			showConfPasswordError();
		}
	});
})();

function showEmailError() {
	email.className = 'invalid';

	if (email.validity.valueMissing) {
		emailValidation.textContent = 'Email is required';
	} else if (email.validity.patternMismatch) {
		emailValidation.textContent = 'Value must be in a valid email format';
	}
}

function showCountryError() {
	country.className = 'invalid';

	if (country.validity.valueMissing) {
		countryValidation.textContent = 'Country is required';
	} else if (country.validity.patternMismatch) {
		countryValidation.textContent = 'Country does not exist';
	}
}

function showZipError() {
	zip.className = 'invalid';

	if (zip.validity.valueMissing) {
		zipValidation.textContent = 'Zip Code is required';
	} else if (zip.validity.patternMismatch) {
		zipValidation.textContent = 'Must have this format: ##### or #####-####';
	}
}

function checkPassword() {
	passwordErrorsDiv.classList.remove('hidden');

	let valid;

	(function () {
		if (
			testRegex(/[A-Z]/, capitalLetterRule) &&
			testRegex(/[a-z]/, smallLetterRule) &&
			testRegex(/\d/, numberRule) &&
			testRegex(/[!@#$%^&*(),.?":{}|<>]/, specialCharacterRule) &&
			testRegex(/^.{8,15}$/, lengthRule)
		) {
			valid = true;
		} else {
			valid = false;
		}
	})();

	(function testAllRegex() {
		testRegex(/[A-Z]/, capitalLetterRule);
		testRegex(/[a-z]/, smallLetterRule);
		testRegex(/\d/, numberRule);
		testRegex(/[!@#$%^&*(),.?":{}|<>]/, specialCharacterRule);
		testRegex(/^.{8,15}$/, lengthRule);
	})();

	return valid;
}

function testRegex(regex, rule) {
	if (regex.test(password.value)) {
		rule.className = 'bold-green-font';
		return true;
	} else {
		rule.className = 'black-font';
		return false;
	}
}

function showPasswordError() {
	passValidation.textContent = 'Please enter a valid password';
	password.className = 'invalid';
}

function checkPasswordMatch() {
	if (password.value === confPassword.value) {
		return true;
	}
}

function showConfPasswordError() {
	confPassValidation.textContent = 'Passwords do not match';
	confPassword.className = 'invalid';
}

(function addListenerToFormSubmit() {
	form.addEventListener('submit', e => {
		let preventDefault = false;

		if (!email.validity.valid) {
			showEmailError();
			preventDefault = true;
		}

		if (!country.validity.valid) {
			showCountryError();
			preventDefault = true;
		}

		if (!zip.validity.valid) {
			showZipError();
			preventDefault = true;
		}

		if (!checkPassword()) {
			showPasswordError();
			preventDefault = true;
		}

		if (!checkPasswordMatch()) {
			showConfPasswordError();
			preventDefault = true;
		}

		if (preventDefault) e.preventDefault();
	});
})();
