import { checkForm } from "./helpers/validateForm.js";

const d = document,
	$navbarList = d.querySelector(".navbar ul"),
	$burgerList = d.querySelector(".burger-list"),
	$navbar = d.getElementById("navbar-template").content,
	$contact = d.querySelector(".contact-us-container"),
	$headerImg = d.querySelector(".header-img"),
	$headerBg = d.querySelector(".header"),
	$header = d.querySelectorAll(".header *"),
	$enterprise = d.querySelector(".enterprise-container"),
	$modalLoader = d.querySelector(".modal-loader"),
	$darkBG = d.querySelectorAll("[data-dark-bg]"),
	$darkGradient = d.querySelectorAll("[data-dark-gradient]"),
	$darkBox = d.querySelectorAll("[data-dark-box]"),
	$darkSmall = d.querySelectorAll("[data-dark-small]"),
	$error = {
		name: d.querySelector(".error__group__name"),
		email: d.querySelector(".error__group__email"),
		message: d.querySelector(".error__group__message"),
	};

const isValid = {
	name: false,
	email: false,
	message: false,
};

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
	if (el.matches(".link-contact")) contact.classList.remove("opacity-hidden");
}

function disableNavbarBtn(el, btn) {
	if (!el.matches(".navbar a") || !el.matches(".burger-list a")) return;
	btn.preventDefault();
	console.log("working");
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

function loadEnterprises() {
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

d.addEventListener("DOMContentLoaded", (e) => loadNavbar());
d.addEventListener("click", (e) => {
	setDarkMode(e.target);
	loadMobileNavbar(e.target, $burgerList);
	showContact(e.target, $contact);
	disableNavbarBtn(e.target, e);
	backToHome(e.target);
	loadHome(e.target);
	loadEnterprises(e.target);
});

d.addEventListener("keyup", (e) => {
	if (!e.target.matches(".contact-form")) return;
	checkForm(e.target, $error, isValid);
});
