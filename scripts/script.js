// Variables initiales
let secretWord;
let currentRow = 0;
let currentCol = 1; // Commence à 1 pour éviter la première lettre qui est fixe
let correctLetters = []; // Stocke les lettres correctes trouvées
let firstLetterLocked;
let gameOver = false; // Variable pour vérifier si la partie est terminée

const grid = document.getElementById("grid");
const messageContainer = document.getElementById("message"); 
const replayButton = document.getElementById("replayButton");

replayButton.addEventListener("click", resetGame);

// Fonction pour sélectionner un mot aléatoire depuis l'API
function selectRandomWord() {
    return fetch('https://localhost:7110/api/Lexique/randomword/')
        .then(response => {
            if (!response.ok) {
                console.error('Échec de la récupération du mot aléatoire');
                return null;
            }
            return response.text();
        })
        .then(word => {
            return word ? word.toUpperCase() : null;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du mot aléatoire:', error);
            return null;
        });
}

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
function showMessage(msg, showButton = false) {
    messageContainer.style.display = 'block';
    messageContainer.textContent = msg;
    replayButton.style.display = showButton ? 'block' : 'none';
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
    messageContainer.textContent = ''; // Effacer le message
    messageContainer.style.display = 'none'; // Cacher le message
    replayButton.style.display = 'none'; // Cacher le bouton rejouer

    selectRandomWord().then(word => {
        if (!word) {
            showMessage('Erreur lors de la récupération du mot à deviner.');
            return;
        }
        secretWord = word;
        console.log(word);
        firstLetterLocked = secretWord[0]; // Mettre à jour la première lettre

        updateGridSize(); // Mettre à jour la taille de la grille pour le nouveau mot
        setFirstLetter(); // Fixer la première lettre sur la nouvelle grille
        placeCorrectLetters(); // Placer les lettres correctes si elles existent
    });
}

// Initialiser le jeu
function initGame() {
    selectRandomWord().then(word => {
        if (!word) {
            showMessage('Erreur lors de la récupération du mot à deviner.');
            return;
        }
        secretWord = word;
        console.log(word);
        firstLetterLocked = secretWord[0];
        updateGridSize();
        setFirstLetter();
    });
}

// Écouter les entrées clavier
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

    // Vérifier si le mot existe via l'API
    fetch(`https://localhost:7110/api/Lexique/verify?word=${attempt}`)
        .then(response => {
            if (!response.ok) {
                console.error('Échec de la vérification du mot');
                return;
            }
            return response.json();
        })
        .then(exists => {
            if (!exists) {
                showMessage(`Le mot "${attempt}" n'existe pas.`);
                // Effacer la ligne actuelle (sauf les lettres fixes)
                for (let i = 0; i < secretWord.length; i++) {
                    const cell = cells[currentRow * secretWord.length + i];
                    const cellContent = cell.querySelector('.cell-content');
                    if (!cell.classList.contains('fixed')) {
                        cellContent.textContent = '';
                    }
                    cell.classList.remove('correct', 'misplaced', 'wrong');
                }
                currentCol = 1;
                return;
            }

            // Si le mot existe, cacher le message
            messageContainer.style.display = 'none';

            // Procéder à la validation de l'essai
            processAttempt(attempt, cells);
        })
        .catch(error => {
            console.error('Erreur lors de la vérification du mot:', error);
        });
}

// Fonction pour traiter l'essai
function processAttempt(attempt, cells) {
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

    // Vérifier les lettres mal placées
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
        showMessage("Bravo ! Vous avez trouvé le mot.", true);
        endGame();
    } else if (currentRow === 5) { // Plus de tentatives restantes
        showMessage(`Dommage, le mot était "${secretWord}".`, true);
        endGame();
    } else {
        currentRow++;
        currentCol = 1; // Repart à 1 pour la ligne suivante
        setFirstLetter(); // Fixer la première lettre sur la ligne suivante
        placeCorrectLetters(); // Placer les lettres correctes trouvées à leur place sur la ligne suivante
    }
}

// Démarrer le jeu
initGame();
