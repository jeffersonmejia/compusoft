const d = document,
	$navbarList = d.querySelector(".navbar ul"),
	$burgerList = d.querySelector(".burger-list"),
	$navbar = d.getElementById("navbar-template").content;

d.addEventListener("DOMContentLoaded", (e) => {
	let $navbarClone = $navbar.cloneNode(true);
	$navbarList.appendChild($navbar);
	$burgerList.appendChild($navbarClone);
});
d.addEventListener("click", (e) => {
	if (e.target.matches(".burger")) {
		$burgerList.classList.toggle("opacity-hidden");
	}
});
