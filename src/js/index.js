const d = document,
	$navbarList = d.querySelector(".navbar ul"),
	$burgerList = d.querySelector(".burger-list"),
	$navbar = d.getElementById("navbar-template").content,
	$contact = d.querySelector(".contact-us-container");

d.addEventListener("DOMContentLoaded", (e) => {
	let $navbarClone = $navbar.cloneNode(true);
	$navbarList.appendChild($navbar);
	$burgerList.appendChild($navbarClone);
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
		$contact.classList.add("opacity-hidden");
	}
});
