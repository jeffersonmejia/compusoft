import regEx from "./regEx.js";

/**
 * Evaluate a string according to a type of regular expression
 * @param {String} value it gets a string to evaluate
 * @param {String} type it gets the regular expression type to evaluate
 * @returns
 */
const validate = (value, type) => regEx[type].test(value);

/**
 * Check a form completely and it valids that all inputs has information and
 * @param {HTMLInputElement} input it gets that input to get evalute
 * @param {HTMLUListElement} error it gets the message list to show in an unorder list
 * @param {Boolean} isValid it gets a object to validate all of the inputs
 */
function checkForm(input, error, isValid) {
	if (validate(input.value, input.name)) {
		error[input.name].classList.remove("visible");
		isValid[input.name] = true;
	} else {
		error[input.name].classList.add("visible");
		isValid[input.name] = false;
	}
}

export { validate, checkForm };
