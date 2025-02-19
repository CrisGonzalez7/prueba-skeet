// Visor superior izquierdo

document.addEventListener("keydown", function(event) {
    if (event.key === "+") {
        document.getElementById("d1").classList.add("verde");
    }
    if (event.key === "-") {
        document.getElementById("d1").classList.add("rojo");
    }
});