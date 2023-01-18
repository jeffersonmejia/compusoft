const d = document,
	$navbarList = d.querySelector(".navbar ul"),
	$burgerList = d.querySelector(".burger-list"),
	$navbar = d.getElementById("navbar-template").content,
	$contact = d.querySelector(".contact-us-container"),
	$headerImg = d.querySelector("header img");

d.addEventListener("DOMContentLoaded", (e) => {
	let $navbarClone = $navbar.cloneNode(true);
	$navbarList.appendChild($navbar);
	$burgerList.appendChild($navbarClone);
	$headerImg.classList.add("img-translated");
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
});
