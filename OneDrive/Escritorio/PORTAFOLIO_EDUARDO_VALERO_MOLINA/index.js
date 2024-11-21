// Obtiene las referencias a los elementos del DOM
const menuToggle = document.getElementById("menu-toggle");
const closeMenu = document.getElementById("close-menu");
const navegacion = document.getElementById("navegacion");

// Función para abrir el menú
menuToggle.addEventListener("click", () => {
    navegacion.classList.add("show"); // Muestra el menú añadiendo la clase 'show'
    closeMenu.style.display = "block"; // Muestra el botón de cerrar
});

// Función para cerrar el menú
closeMenu.addEventListener("click", () => {
    navegacion.classList.remove("show"); // Oculta el menú quitando la clase 'show'
    closeMenu.style.display = "none"; // Oculta el botón de cerrar
});
