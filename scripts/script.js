// Liste des mots avec des tailles différentes
const wordList = [
    "CHAT", "SOURIS", "ORANGE", "CHIEN", "MONDE", "JARDIN", "ELEPHANT",
    "VOITURE", "BALLON", "MONTAGNE", "ARBRE", "FENETRE", "HORLOGE",
    "NOURRITURE", "BIBLIOTHEQUE", "AVION", "PLANETE", "CROCODILE", "TELEPHONE", "AVENTURE"
];

// Sélectionner un mot aléatoire de la liste
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex].toUpperCase();
}

let secretWord = selectRandomWord(); // Le mot à deviner est sélectionné aléatoirement
let currentRow = 0;
let currentCol = 1; // Commence à 1 pour éviter la première lettre qui est fixe
let correctLetters = []; // Stocke les lettres correctes trouvées
let firstLetterLocked = secretWord[0];
let gameOver = false; // Variable pour vérifier si la partie est terminée

console.log(secretWord);

const grid = document.getElementById("grid");
const messageContainer = document.getElementById("message"); 
const replayButton = document.getElementById("replayButton");

replayButton.addEventListener("click", resetGame);

// Mettre à jour dynamiquement la grille en fonction de la taille du mot
function updateGridSize() {
    const wordLength = secretWord.length;
    grid.style.gridTemplateColumns = `repeat(${wordLength}, 2.1rem)`; // Adapter les colonnes à la taille du mot

    // Réinitialiser la grille avec des cases vides en fonction de la taille du mot
    grid.innerHTML = ''; // Vide la grille
    for (let i = 0; i < 6; i++) { // 6 lignes
        for (let j = 0; j < wordLength; j++) { // Colonnes en fonction de la taille du mot
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            const cellContent = document.createElement('div');
            cellContent.classList.add('cell-content');
            cellContent.textContent = ''; // Case vide au départ
            cell.appendChild(cellContent);
            grid.appendChild(cell);
        }
    }
}

// Fixer la première lettre sur chaque ligne
function setFirstLetter() {
    const firstCell = document.querySelectorAll('.grid-cell')[currentRow * secretWord.length]; // Adapter à la longueur du mot
    const firstCellContent = firstCell.querySelector('.cell-content');
    firstCellContent.textContent = firstLetterLocked;
    firstCellContent.classList.add('correct'); // On la met bien placée
    firstCell.classList.add('fixed'); // Empêche d'écrire dessus
}

// Mise à jour de la grille pour le mot au début de la partie
updateGridSize();
setFirstLetter();

// Mise à jour de la grille avec la lettre saisie
document.addEventListener('keydown', (e) => {
    if (gameOver) return; // Empêche la modification si la partie est terminée
    const cells = document.querySelectorAll('.grid-cell');
    if (e.key.match(/^[a-zA-Z]$/) && currentCol < secretWord.length) {
        const cell = cells[currentRow * secretWord.length + currentCol];
        const cellContent = cell.querySelector('.cell-content');
        if (!cell.classList.contains('fixed')) { // On évite les cases fixes
            cellContent.textContent = e.key.toUpperCase();
            currentCol++;
        }
    } else if (e.key === 'Backspace' && currentCol > 1) { // Commence à 1 pour éviter la première lettre
        currentCol--;
        const cell = cells[currentRow * secretWord.length + currentCol];
        const cellContent = cell.querySelector('.cell-content');
        if (!cell.classList.contains('fixed')) { // On évite de modifier les cases fixes
            cellContent.textContent = '';
        }
    } else if (e.key === 'Enter' && currentCol === secretWord.length) {
        validateAttempt();
    }
});

// Validation de l'essai
function validateAttempt() {
    const cells = document.querySelectorAll('.grid-cell');
    const attempt = Array.from({ length: secretWord.length }, (_, i) => cells[currentRow * secretWord.length + i].querySelector('.cell-content').textContent).join('');

    let secretArray = secretWord.split(''); // Créer une copie du mot secret
    let attemptArray = attempt.split('');   // Créer une copie de l'essai de l'utilisateur

    // Vérifier les lettres correctes (bien placées)
    for (let i = 0; i < secretWord.length; i++) {
        const cell = cells[currentRow * secretWord.length + i];
        const cellContent = cell.querySelector('.cell-content');
        const letter = cellContent.textContent;

        if (letter === secretWord[i]) {
            cell.classList.add('correct');
            correctLetters[i] = letter; // Lettre correcte à sa place
            secretArray[i] = null;      // Enlever cette lettre de la copie du mot secret
            attemptArray[i] = null;     // Enlever cette lettre de l'essai
        }
    }

    // Vérifier les lettres mal placées (qui existent dans le mot mais à une mauvaise place)
    for (let i = 0; i < secretWord.length; i++) {
        const cell = cells[currentRow * secretWord.length + i];
        const cellContent = cell.querySelector('.cell-content');
        const letter = attemptArray[i];

        if (letter && secretArray.includes(letter)) {
            cell.classList.add('misplaced');
            secretArray[secretArray.indexOf(letter)] = null; // Enlever la lettre trouvée pour ne pas la réutiliser
        } else if (letter) {
            cell.classList.add('wrong');
        }
    }

    if (attempt === secretWord) {
        showMessage("Bravo ! Vous avez trouvé le mot.");
        endGame();
    } else if (currentRow === 5) { // Plus de tentatives restantes
        showMessage(`Dommage, le mot était "${secretWord}".`);
        endGame();
    } else {
        currentRow++;
        currentCol = 1; // Repart à 1 pour la ligne suivante
        setFirstLetter(); // Fixer la première lettre sur la ligne suivante
        placeCorrectLetters(); // Placer les lettres correctes trouvées à leur place sur la ligne suivante
    }
}

// Placer les lettres correctes sur la ligne suivante
function placeCorrectLetters() {
    const cells = document.querySelectorAll('.grid-cell');
    for (let i = 0; i < secretWord.length; i++) {
        if (correctLetters[i]) {
            const cell = cells[currentRow * secretWord.length + i];
            const cellContent = cell.querySelector('.cell-content');
            cellContent.textContent = correctLetters[i];
        }
    }
}

// Afficher un message sous la grille
function showMessage(msg) {
    document.getElementById("message").style.display = 'block';
    document.getElementById("message").textContent = msg;
    document.getElementById("replayButton").style.display = 'block'; // Afficher le bouton rejouer
}

// Fin de partie, désactiver la saisie
function endGame() {
    gameOver = true; // Désactiver les entrées utilisateur
}

// Réinitialiser le jeu
function resetGame() {
    gameOver = false; // Réactiver les entrées
    currentRow = 0;
    currentCol = 1;
    correctLetters = []; // Réinitialiser les lettres correctes
    secretWord = selectRandomWord(); // Choisir un nouveau mot aléatoire
    firstLetterLocked = secretWord[0]; // Mettre à jour la première lettre

    updateGridSize(); // Mettre à jour la taille de la grille pour le nouveau mot
    setFirstLetter(); // Fixer la première lettre sur la nouvelle grille
    messageContainer.textContent = ''; // Effacer le message
    messageContainer.style.display = 'none'; // Cacher le message
    replayButton.style.display = 'none'; // Cacher le bouton rejouer
}

// Initialiser le jeu avec la première lettre
setFirstLetter();
