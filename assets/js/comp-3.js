const totalShots = 20;
let players = [];

function startGame() {
    let numPlayers = parseInt(document.getElementById("numPlayers").value);

    if (numPlayers < 1 || numPlayers > 10 || isNaN(numPlayers)) {
        alert("Por favor, ingresa un número válido entre 1 y 10.");
        return;
    }

    players = [];
    for (let i = 0; i < numPlayers; i++) {
        let name = prompt(`Ingresa el nombre del Jugador ${i + 1}:`);
        if (!name) name = `Jugador ${i + 1}`;
        players.push({ name, score: 0, currentShot: 0 });
    }

    document.getElementById("setup").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    renderTables();
}

function renderTables() {
    const scoreBody = document.getElementById("scoreBody");
    const shotsTable = document.getElementById("shotsTable");

    scoreBody.innerHTML = "";
    shotsTable.innerHTML = "";

    // Crear encabezado de la tabla de disparos
    let headerRow = document.createElement("tr");
    let headerCell = document.createElement("th");
    headerCell.textContent = "Jugador / Disparos";
    headerRow.appendChild(headerCell);

    for (let i = 1; i <= totalShots; i++) {
        let th = document.createElement("th");
        th.textContent = i;
        headerRow.appendChild(th);
    }
    shotsTable.appendChild(headerRow);

    // Crear filas para cada jugador
    players.forEach((player, index) => {
        let scoreRow = document.createElement("tr");
        let nameCell = document.createElement("td");
        nameCell.textContent = player.name;
        scoreRow.appendChild(nameCell);

        let scoreCell = document.createElement("td");
        scoreCell.id = `score-${index}`;
        scoreCell.textContent = "0";
        scoreRow.appendChild(scoreCell);

        let actionsCell = document.createElement("td");
        let hitButton = document.createElement("button");
        hitButton.textContent = "+ Acertar";
        hitButton.onclick = () => updateShot(index, true);

        let missButton = document.createElement("button");
        missButton.textContent = "- Errar";
        missButton.onclick = () => updateShot(index, false);

        actionsCell.appendChild(hitButton);
        actionsCell.appendChild(missButton);
        scoreRow.appendChild(actionsCell);
        scoreBody.appendChild(scoreRow);

        // Crear la fila de disparos
        let shotRow = document.createElement("tr");
        let playerNameCell = document.createElement("td");
        playerNameCell.textContent = player.name;
        shotRow.appendChild(playerNameCell);

        for (let j = 0; j < totalShots; j++) {
            let cell = document.createElement("td");
            cell.id = `shot-${index}-${j}`;
            shotRow.appendChild(cell);
        }
        shotsTable.appendChild(shotRow);
    });
}

function updateShot(playerIndex, hit) {
    let player = players[playerIndex];

    if (player.currentShot >= totalShots) return;

    let cell = document.getElementById(`shot-${playerIndex}-${player.currentShot}`);

    if (hit) {
        cell.style.backgroundColor = "green"; // Acertó
        player.score += 1;
    } else {
        cell.style.backgroundColor = "red"; // Erró
    }

    document.getElementById(`score-${playerIndex}`).textContent = player.score;
    player.currentShot += 1;

    if (player.currentShot >= totalShots) {
        alert(`${player.name} ha terminado sus disparos.`);
    }

    checkGameEnd();
}

// Ranking

function checkGameEnd() {
    // Verifica si todos los jugadores han terminado sus 20 disparos
    let allFinished = players.every(player => player.currentShot >= totalShots);

    if (allFinished) {
        showRanking();
    }
}

function showRanking() {
    const rankingTable = document.getElementById("rankingTable");
    const rankingBody = document.getElementById("rankingBody");
    const resetButton = document.getElementById("resetButton");

    rankingBody.innerHTML = "";

    // Ordenar los jugadores por puntaje de mayor a menor
    let sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    sortedPlayers.forEach((player, index) => {
        let row = document.createElement("tr");
        let positionCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let scoreCell = document.createElement("td");

        positionCell.textContent = index + 1; // Posición en el ranking
        nameCell.textContent = player.name;
        scoreCell.textContent = player.score;

        row.appendChild(positionCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        rankingBody.appendChild(row);
    });

    rankingTable.style.display = "block";
    resetButton.style.display = "block";
}

function resetGame() {
    document.getElementById("setup").style.display = "block";
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("rankingTable").style.display = "none";
    document.getElementById("resetButton").style.display = "none";

    document.getElementById("numPlayers").value = "";
}