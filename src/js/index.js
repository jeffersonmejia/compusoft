import { checkForm } from "./helpers/validateForm.js";

const d = document,
	$navbarList = d.querySelector(".navbar ul"),
	$burgerList = d.querySelector(".burger-list"),
	$navbar = d.getElementById("navbar-template").content,
	$contact = d.querySelector(".contact-us-container"),
	$contactForm = d.querySelector(".contact-us-container form"),
	$headerImg = d.querySelector(".header-img"),
	$headerBg = d.querySelector(".header"),
	$header = d.querySelectorAll(".header *"),
	$enterprise = d.querySelector(".enterprise-container"),
	$modalLoader = d.querySelector(".modal-loader"),
	$darkBG = d.querySelectorAll("[data-dark-bg]"),
	$darkGradient = d.querySelectorAll("[data-dark-gradient]"),
	$darkBox = d.querySelectorAll("[data-dark-box]"),
	$darkSmall = d.querySelectorAll("[data-dark-small]"),
	$submitContact = d.querySelector(".contact-form-btn"),
	$error = {
		name: d.querySelector(".error__group__name"),
		email: d.querySelector(".error__group__email"),
		message: d.querySelector(".error__group__message"),
	},
	$allInputs = d.querySelectorAll(".contact-form input"),
	$allTextArea = d.querySelectorAll(".contact-form textarea"),
	$contactResponse = d.querySelector(".contact-form-response"),
	$responseText = d.querySelector(".contact-form-response small"),
	$responseIcon = d.querySelector(".contact-form-response span"),
	$loader = d.querySelector(".modal-loader");
const dataCollected = {};
const isValid = {
	name: false,
	email: false,
	message: false,
};

const host = "localhost",
	path = "compusoft/server/contact.php",
	API = `http://localhost/compusoft/server/contact.php`;

function loadNavbar() {
	let $navbarClone = $navbar.cloneNode(true);
	$navbarList.appendChild($navbar);
	$burgerList.appendChild($navbarClone);

	setTimeout(() => $modalLoader.classList.add("opacity-hidden"), 1000);
	setTimeout(() => $headerImg.classList.add("img-translated"), 1000);
}

function loadMobileNavbar(el, burger) {
	if (!el.matches(".burger")) return;
	burger.classList.toggle("opacity-hidden");
}

function showContact(el, contact) {
	if (!el.matches(".link-contact")) return;
	contact.classList.remove("opacity-hidden");
	contact.classList.remove("hidden");
	$contact.classList.remove("hidden");
	$contactForm.classList.remove("hidden");
	$contactResponse.classList.add("hidden");
}

function disableNavbarBtn(el, btn) {
	if (!el.matches(".navbar a") || !el.matches(".burger-list a")) return;
	btn.preventDefault();
}

function backToHome(el) {
	if (!el.matches(".btn-back")) return;
	$burgerList.classList.add("opacity-hidden");
	$contact.classList.add("opacity-hidden");
}

function loadHome(el) {
	if (!el.matches(".link-home")) return;

	$burgerList.classList.add("opacity-hidden");
	$navbarList.parentElement.classList.remove("navbar-reading");
	$headerBg.classList.remove("header-light");
	$enterprise.classList.add("opacity-hidden");
	$burgerList.classList.remove("opacity-hidden");
	$header[0].classList.remove("opacity-hidden");
	$header[1].classList.remove("opacity-hidden");
	$header[0].classList.add("opacity-visible");
	$header[1].classList.add("opacity-visible");
}

function loadEnterprises(el) {
	if (!el.matches(".link-enterprises")) return;
	$navbarList.parentElement.classList.add("navbar-reading");
	$headerBg.classList.add("header-light");
	$enterprise.classList.remove("opacity-hidden");
	$burgerList.classList.add("opacity-hidden");
	$header[0].classList.add("opacity-hidden");
	$header[1].classList.add("opacity-hidden");
	$header[0].classList.remove("opacity-visible");
	$header[1].classList.remove("opacity-visible");
}

function setDarkMode(el) {
	if (el.matches(".dark-mode")) {
		$darkBG.forEach((el) => el.classList.toggle("dark-bg"));
		$darkGradient.forEach((el) => el.classList.toggle("dark-gradient"));
		$darkBox.forEach((el) => el.classList.toggle("dark-box"));
		$darkSmall.forEach((el) => el.classList.toggle("dark-small"));
	}
}

function disableBtn(el) {
	if (!el.target.matches(".contact-form-btn")) return;
	el.target.classList.remove("hidden");
	el.preventDefault();
}
function enableBtn(e, { name, email, message }) {
	if (!e.target.matches(`.contact-form fieldset *`)) return;
	checkForm(e.target, $error, isValid);

	if (name && email && message) {
		$submitContact.disabled = false;
		collectData();
	}
}
async function sendForm() {
	$loader.classList.remove("opacity-hidden");
	try {
		const header = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				body: JSON.stringify(dataCollected),
			},
		};

		const res = await fetch(API, header),
			json = await res.json();

		if (!res.ok)
			throw {
				status: res.status,
				statusText: res.statusText,
			};

		$contactForm.classList.add("hidden");
		$contactResponse.classList.add("response-success");
		$contactResponse.classList.remove("hidden");
		$responseText.textContent = "Formulario envíado con éxito";
		setTimeout(() => {
			$contact.classList.add("hidden");
			$loader.classList.add("opacity-hidden");
		}, 1800);
	} catch (error) {
		$contactForm.classList.add("hidden");
		$contactResponse.classList.add("response-unsuccess");
		$contactResponse.classList.remove("hidden");
		$responseText.textContent = `Error ${error.status || "interno"}: ${
			error.statusText || "Estamos presentando inconvenientes"
		}`;
		$responseIcon.textContent = "cancel";
		setTimeout(() => {
			$contact.classList.add("hidden");
			$loader.classList.add("opacity-hidden");
		}, 1800);
	}
}
function collectData() {
	$allInputs.forEach((input) => (dataCollected[input.name] = input.value));
	$allTextArea.forEach((el) => (dataCollected[el.name] = el.value));
}

function OnSubmitClick(el) {
	if (!el.matches(".contact-form-btn")) return;
	sendForm();
}

d.addEventListener("DOMContentLoaded", (e) => loadNavbar());
d.addEventListener("keyup", (e) => enableBtn(e, isValid));
d.addEventListener("click", (e) => {
	setDarkMode(e.target);
	loadMobileNavbar(e.target, $burgerList);
	showContact(e.target, $contact);
	disableNavbarBtn(e.target, e);
	backToHome(e.target);
	loadHome(e.target);
	loadEnterprises(e.target);
	disableBtn(e);
	OnSubmitClick(e.target);
});
