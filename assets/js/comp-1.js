document.getElementById("startGame").addEventListener("click", function() {
    let numParticipants = document.getElementById("numParticipants").value;
    numParticipants = parseInt(numParticipants);

    if (isNaN(numParticipants) || numParticipants < 1) {
        alert("Por favor, ingresa un número válido de participantes.");
        return;
    }

    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = ""; // Limpia el tablero si ya existía

    for (let i = 1; i <= numParticipants; i++) {
        let playerDiv = document.createElement("div");
        playerDiv.innerHTML = `
            <p>Jugador ${i}: <span id="score-${i}">0</span> puntos</p>
            <button onclick="addPoint(${i})">+1 Punto</button>
        `;
        scoreboard.appendChild(playerDiv);
    }
});

function addPoint(player) {
    let scoreSpan = document.getElementById(`score-${player}`);
    let score = parseInt(scoreSpan.textContent);
    score += 1;
    scoreSpan.textContent = score;
}