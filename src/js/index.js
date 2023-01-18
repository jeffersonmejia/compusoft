const d = document,
	$navbarList = d.querySelector(".navbar ul"),
	$burgerList = d.querySelector(".burger-list"),
	$navbar = d.getElementById("navbar-template").content,
	$contact = d.querySelector(".contact-us-container"),
	$headerImg = d.querySelector(".header-img"),
	$headerBg = d.querySelector(".header"),
	$header = d.querySelectorAll(".header *"),
	$enterprise = d.querySelector(".enterprise-container"),
	$footer = d.querySelector("footer"),
	$body = d.querySelector("body"),
	$modalLoader = d.querySelector(".modal-loader");

d.addEventListener("DOMContentLoaded", (e) => {
	let $navbarClone = $navbar.cloneNode(true);
	$navbarList.appendChild($navbar);
	$burgerList.appendChild($navbarClone);
	setTimeout(() => {
		$modalLoader.classList.add("opacity-hidden");
	}, 1000);
	setTimeout(() => {
		$headerImg.classList.add("img-translated");
	}, 1000);
});
d.addEventListener("click", (e) => {
	if (e.target.matches(".burger")) {
		$burgerList.classList.toggle("opacity-hidden");
	}
	if (e.target.matches(".link-contact")) {
		$contact.classList.remove("opacity-hidden");
	}
	if (e.target.matches(".navbar a") || e.target.matches(".burger-list a")) {
		e.preventDefault();
	}
	if (e.target.matches(".btn-back")) {
		$burgerList.classList.add("opacity-hidden");
		$contact.classList.add("opacity-hidden");
	}
	if (e.target.matches(".link-home")) {
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
	if (e.target.matches(".link-enterprises")) {
		$navbarList.parentElement.classList.add("navbar-reading");
		$headerBg.classList.add("header-light");
		$enterprise.classList.remove("opacity-hidden");
		$burgerList.classList.add("opacity-hidden");
		$header[0].classList.add("opacity-hidden");
		$header[1].classList.add("opacity-hidden");
		$header[0].classList.remove("opacity-visible");
		$header[1].classList.remove("opacity-visible");
	}
});
