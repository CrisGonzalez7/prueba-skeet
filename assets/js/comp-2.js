const totalShots = 20;
let currentShot = 0;
let score = 0;

const scoreDisplay = document.getElementById("score");
const hitButton = document.getElementById("hitButton");
const missButton = document.getElementById("missButton");
const shotRow = document.getElementById("shotRow");

// Crear la tabla de 20 casillas
for (let i = 0; i < totalShots; i++) {
    let cell = document.createElement("td");
    cell.id = `shot-${i}`;
    shotRow.appendChild(cell);
}

// Función para actualizar el disparo
function updateShot(hit) {
    if (currentShot >= totalShots) return; // Si ya se completaron 20 disparos, no hacer nada

    let cell = document.getElementById(`shot-${currentShot}`);

    if (hit) {
        cell.style.backgroundColor = "green"; // Acertó
        score += 1;
        scoreDisplay.textContent = score;
    } else {
        cell.style.backgroundColor = "red"; // Erró
    }

    currentShot += 1;

    if (currentShot >= totalShots) {
        hitButton.disabled = true;
        missButton.disabled = true;
        alert("¡Juego terminado!");
    }
}

// Eventos para los botones
hitButton.addEventListener("click", () => updateShot(true));
missButton.addEventListener("click", () => updateShot(false));