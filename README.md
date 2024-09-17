## **Plan de Démonstration Détaillé**

1. **Étape 1 : Création de la structure HTML de base**
   - **1.1** : Créer une page HTML avec un titre et une section pour la grille.
   - **1.2** : Ajouter une grille statique de taille fixe (par exemple, 8 colonnes et 6 lignes).
   - **Test** : Vérifier que la grille s'affiche correctement dans le navigateur.

2. **Étape 2 : Ajout du style CSS de base**
   - **2.1** : Styliser la grille pour qu'elle ressemble à un tableau de jeu.
   - **2.2** : Ajouter des styles pour les cellules, y compris la taille et les bordures.
   - **Test** : Vérifier que la grille est bien stylisée et que les cellules sont visibles.

3. **Étape 3 : Gestion de la saisie utilisateur**
   - **3.1** : Permettre à l'utilisateur de saisir des lettres dans les cellules.
   - **3.2** : Limiter la saisie aux lettres majuscules de l'alphabet.
   - **Test** : Vérifier que seules les lettres majuscules peuvent être saisies.

4. **Étape 4 : Navigation entre les cellules**
   - **4.1** : Passer automatiquement au champ suivant après la saisie d'une lettre.
   - **4.2** : Gérer la touche "Backspace" pour revenir en arrière.
   - **Test** : Vérifier que la navigation fonctionne correctement.

5. **Étape 5 : Intégration d'une liste de mots prédéfinie**
   - **5.1** : Créer un tableau de mots avec des mots de longueur 8.
   - **5.2** : Sélectionner un mot secret aléatoirement au début du jeu.
   - **Test** : Afficher le mot secret dans la console pour vérifier qu'il est sélectionné.

6. **Étape 6 : Vérification de l'essai de l'utilisateur**
   - **6.1** : Comparer le mot saisi par l'utilisateur avec le mot secret.
   - **6.2** : Indiquer à l'utilisateur s'il a trouvé le mot ou non.
   - **Test** : Saisir le mot correct et vérifier que le jeu signale la victoire.

7. **Étape 7 : Retour visuel sur les lettres**
   - **7.1** : Ajouter des couleurs pour indiquer les lettres correctes, mal placées et incorrectes.
   - **7.2** : Mettre à jour les styles des cellules en fonction de la validation.
   - **Test** : Vérifier que les couleurs s'affichent correctement après chaque essai.

8. **Étape 8 : Gestion des tentatives multiples**
   - **8.1** : Limiter le nombre de tentatives à 6.
   - **8.2** : Gérer la fin de la partie en cas d'échec.
   - **Test** : Saisir des mots incorrects jusqu'à épuisement des tentatives et vérifier le message de fin.

9. **Étape 9 : Ajout des messages d'information**
   - **9.1** : Afficher des messages pour informer l'utilisateur (mot inexistant, victoire, défaite).
   - **9.2** : Ajouter un bouton pour rejouer.
   - **Test** : Vérifier que les messages s'affichent au bon moment et que le bouton de rejouer fonctionne.

10. **Étape 10 : Connexion à l'API pour le mot secret**
    - **10.1** : Remplacer le tableau de mots par un appel à l'API pour obtenir le mot secret.
    - **10.2** : Gérer les appels asynchrones à l'API.
    - **Test** : Vérifier que le mot secret est bien récupéré depuis l'API.

11. **Étape 11 : Vérification des mots saisis via l'API**
    - **11.1** : Avant de valider un essai, vérifier que le mot saisi existe en interrogeant l'API.
    - **11.2** : Gérer les cas où le mot n'existe pas en affichant un message et en effaçant la ligne.
    - **Test** : Saisir un mot inexistant et vérifier le comportement du jeu.

12. **Étape 12 : Améliorations finales et tests globaux**
    - **12.1** : Optimiser le code et améliorer l'interface utilisateur.
    - **12.2** : Effectuer des tests globaux pour s'assurer que toutes les fonctionnalités fonctionnent correctement.

---

## **Code et Explications par Étape avec Tests**

### **Étape 1 : Création de la structure HTML de base**

#### **1.1 Créer une page HTML avec un titre et une section pour la grille**

**Code HTML :**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Jeu de Mot - Étape 1</title>
</head>
<body>
    <h1>Jeu de Mot</h1>
    <div id="grid"></div>
</body>
</html>
```

**Explications :**

- **`<div id="grid"></div>`** : Cette div contiendra la grille du jeu.

#### **1.2 Ajouter une grille statique de taille fixe**

**Mise à jour du code HTML :**

Nous allons ajouter des div pour représenter les cellules de la grille.

```html
<div id="grid">
    <!-- Grille statique de 6 lignes et 8 colonnes -->
    <div class="row">
        <div class="cell"></div>
        <!-- Répéter 8 fois pour chaque ligne -->
    </div>
    <!-- Répéter 6 fois pour chaque ligne -->
</div>
```

**Pour simplifier, nous pouvons générer la grille avec JavaScript dès maintenant :**

```html
<body>
    <h1>Jeu de Mot</h1>
    <div id="grid"></div>
    <script>
        const grid = document.getElementById('grid');
        const rows = 6;
        const cols = 8;

        // Générer la grille
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
    </script>
</body>
```

**Test :**

- **Ouvrir la page HTML dans un navigateur.**
- **Vérifier que la grille s'affiche avec 6 lignes et 8 colonnes.**
- **Les cellules devraient être visibles même sans style (elles apparaîtront en tant que div vides).**

---

### **Étape 2 : Ajout du style CSS de base**

#### **2.1 Styliser la grille pour qu'elle ressemble à un tableau de jeu**

**Ajout dans la balise `<head>` :**

```html
<head>
    <meta charset="UTF-8">
    <title>Jeu de Mot - Étape 2</title>
    <style>
        #grid {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .row {
            display: flex;
        }
        .cell {
            width: 2rem;
            height: 2rem;
            border: 1px solid #ccc;
            margin: 0.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
```

**Explications :**

- **Grille et lignes :** Nous utilisons Flexbox pour organiser les cellules en lignes et colonnes.
- **Cellules :** Les cellules ont une taille fixe et une bordure pour être visibles.

#### **2.2 Ajouter des styles pour les cellules**

- **Couleur de fond et police :**

```css
.cell {
    width: 2rem;
    height: 2rem;
    border: 1px solid #ccc;
    margin: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
}
```

**Test :**

- **Recharger la page dans le navigateur.**
- **Vérifier que les cellules sont bien alignées et visibles.**

---

### **Étape 3 : Gestion de la saisie utilisateur**

#### **3.1 Permettre à l'utilisateur de saisir des lettres dans les cellules**

**Mise à jour du JavaScript :**

Nous allons transformer les cellules pour qu'elles contiennent des inputs.

```javascript
for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        cell.appendChild(input);
        row.appendChild(cell);
    }
    grid.appendChild(row);
}
```

#### **3.2 Limiter la saisie aux lettres majuscules de l'alphabet**

**Ajouter un écouteur d'événement pour chaque input :**

```javascript
input.addEventListener('input', handleInput);
```

**Définir la fonction `handleInput` :**

```javascript
function handleInput(e) {
    const input = e.target;
    input.value = input.value.toUpperCase();
    if (!input.value.match(/^[A-Z]$/)) {
        input.value = '';
    }
}
```

**Test :**

- **Saisir des caractères dans les cellules.**
- **Vérifier que seules les lettres majuscules sont acceptées.**
- **Les chiffres ou caractères spéciaux doivent être refusés (effacés immédiatement).**

---

### **Étape 4 : Navigation entre les cellules**

#### **4.1 Passer automatiquement au champ suivant après la saisie d'une lettre**

**Mise à jour de la fonction `handleInput` :**

```javascript
function handleInput(e) {
    const input = e.target;
    input.value = input.value.toUpperCase();
    if (!input.value.match(/^[A-Z]$/)) {
        input.value = '';
        return;
    }

    // Passer au champ suivant
    const nextInput = input.parentElement.nextElementSibling?.querySelector('input');
    if (nextInput) {
        nextInput.focus();
    }
}
```

#### **4.2 Gérer la touche "Backspace" pour revenir en arrière**

**Ajouter un écouteur pour la touche "keydown" :**

```javascript
input.addEventListener('keydown', handleKeyDown);

function handleKeyDown(e) {
    const input = e.target;
    if (e.key === 'Backspace' && input.value === '') {
        const prevInput = input.parentElement.previousElementSibling?.querySelector('input');
        if (prevInput) {
            prevInput.focus();
        }
    }
}
```

**Test :**

- **Saisir des lettres et vérifier que le focus passe au champ suivant.**
- **Utiliser "Backspace" pour effacer une lettre et revenir au champ précédent.**

---

### **Étape 5 : Intégration d'une liste de mots prédéfinie**

#### **5.1 Créer un tableau de mots avec des mots de longueur 8**

**Ajouter le tableau de mots :**

```javascript
const wordList = [
    "ELEPHANT", "CROCODILE", "TELEPHONE", "ORDINATEUR", "BIBLIOTHEQUE", "CHOCOLAT", "MONTAGNE", "EXEMPLE"
];
```

#### **5.2 Sélectionner un mot secret aléatoirement au début du jeu**

**Définir la fonction `selectRandomWord` :**

```javascript
function selectRandomWord() {
    const filteredWords = wordList.filter(word => word.length === cols);
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex].toUpperCase();
}

let secretWord = selectRandomWord();
console.log("Mot secret :", secretWord); // Pour les tests
```

**Test :**

- **Ouvrir la console du navigateur (F12) et vérifier que le mot secret s'affiche.**

---

### **Étape 6 : Vérification de l'essai de l'utilisateur**

#### **6.1 Comparer le mot saisi par l'utilisateur avec le mot secret**

**Ajouter la fonction `validateAttempt` :**

```javascript
function validateAttempt() {
    const inputs = Array.from(grid.querySelectorAll('input'));
    const start = currentRow * cols;
    const end = start + cols;
    const rowInputs = inputs.slice(start, end);
    const attempt = rowInputs.map(input => input.value).join('');

    if (attempt.length !== cols) {
        alert("Veuillez compléter la ligne.");
        return;
    }

    if (attempt === secretWord) {
        alert('Bravo ! Vous avez trouvé le mot.');
    } else {
        alert('Essayez encore.');
        currentRow++;
        if (currentRow >= rows) {
            alert(`Dommage, le mot était "${secretWord}".`);
        }
    }
}
```

**Appeler `validateAttempt` après que l'utilisateur a rempli une ligne :**

```javascript
if (rowInputs.every(input => input.value !== '')) {
    validateAttempt();
}
```

#### **6.2 Indiquer à l'utilisateur s'il a trouvé le mot ou non**

**Test :**

- **Remplir une ligne avec le mot correct et vérifier que le message de victoire s'affiche.**
- **Remplir une ligne avec un mot incorrect et vérifier que le message d'essai s'affiche.**

---

### **Étape 7 : Retour visuel sur les lettres**

#### **7.1 Ajouter des couleurs pour indiquer les lettres correctes, mal placées et incorrectes**

**Mise à jour du CSS :**

```css
.cell.correct {
    background-color: green;
    color: white;
}

.cell.misplaced {
    background-color: orange;
    color: white;
}

.cell.wrong {
    background-color: grey;
    color: white;
}
```

#### **7.2 Mettre à jour les styles des cellules en fonction de la validation**

**Mise à jour de la fonction `validateAttempt` :**

```javascript
function validateAttempt() {
    // ... (code précédent)
    let secretArray = secretWord.split('');
    let attemptArray = attempt.split('');

    // Vérifier les lettres correctes (bien placées)
    for (let i = 0; i < cols; i++) {
        const cell = rowInputs[i].parentElement;
        if (attemptArray[i] === secretArray[i]) {
            cell.classList.add('correct');
            secretArray[i] = null;
            attemptArray[i] = null;
        }
    }

    // Vérifier les lettres mal placées
    for (let i = 0; i < cols; i++) {
        if (attemptArray[i]) {
            const cell = rowInputs[i].parentElement;
            const index = secretArray.indexOf(attemptArray[i]);
            if (index !== -1) {
                cell.classList.add('misplaced');
                secretArray[index] = null;
            } else {
                cell.classList.add('wrong');
            }
        }
    }

    // ... (suite du code)
}
```

**Test :**

- **Saisir un mot avec des lettres correctes, mal placées et incorrectes.**
- **Vérifier que les cellules s'affichent avec les bonnes couleurs.**

---

### **Étape 8 : Gestion des tentatives multiples**

#### **8.1 Limiter le nombre de tentatives à 6**

- **Déjà implémenté avec la variable `rows = 6` et `currentRow` qui s'incrémente.**

#### **8.2 Gérer la fin de la partie en cas d'échec**

- **Afficher un message lorsque les tentatives sont épuisées.**

**Test :**

- **Saisir des mots incorrects jusqu'à épuisement des tentatives.**
- **Vérifier que le message de fin s'affiche avec le mot secret.**

---

### **Étape 9 : Ajout des messages d'information**

#### **9.1 Afficher des messages pour informer l'utilisateur**

**Ajouter une zone pour les messages dans le HTML :**

```html
<div id="message"></div>
```

**Styliser le message :**

```css
#message {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: red;
}
```

**Mettre à jour le JavaScript pour afficher les messages :**

```javascript
function showMessage(msg) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
}

function validateAttempt() {
    // ... (code précédent)
    if (attempt === secretWord) {
        showMessage('Bravo ! Vous avez trouvé le mot.');
    } else {
        // ...
        if (currentRow >= rows) {
            showMessage(`Dommage, le mot était "${secretWord}".`);
        }
    }
}
```

#### **9.2 Ajouter un bouton pour rejouer**

**Ajouter le bouton dans le HTML :**

```html
<button id="replayButton" style="display: none;">Rejouer</button>
```

**Ajouter un écouteur pour le bouton :**

```javascript
const replayButton = document.getElementById('replayButton');
replayButton.addEventListener('click', resetGame);

function resetGame() {
    // Réinitialiser le jeu
    currentRow = 0;
    secretWord = selectRandomWord();
    generateGrid();
    document.getElementById('message').textContent = '';
    replayButton.style.display = 'none';
}

function showMessage(msg) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
    replayButton.style.display = 'block';
}
```

**Test :**

- **Terminer une partie (victoire ou échec).**
- **Vérifier que le message s'affiche et que le bouton "Rejouer" apparaît.**
- **Cliquer sur "Rejouer" et vérifier que le jeu se réinitialise.**

---

### **Étape 10 : Connexion à l'API pour le mot secret**

#### **10.1 Remplacer le tableau de mots par un appel à l'API**

**Modifier la fonction `selectRandomWord` :**

```javascript
function selectRandomWord() {
    return fetch('https://localhost:7110/api/Lexique/randomword/')
        .then(response => response.text())
        .then(word => word.toUpperCase())
        .catch(error => {
            console.error('Erreur lors de la récupération du mot aléatoire:', error);
            return null;
        });
}
```

#### **10.2 Gérer les appels asynchrones à l'API**

**Modifier `initGame` pour gérer la promesse :**

```javascript
function initGame() {
    selectRandomWord().then(word => {
        if (!word) {
            showMessage('Erreur lors de la récupération du mot à deviner.');
            return;
        }
        secretWord = word;
        cols = secretWord.length;
        generateGrid();
    });
}

initGame();
```

**Test :**

- **Assurez-vous que l'API est en cours d'exécution.**
- **Recharger la page et vérifier que le mot secret est récupéré (vous pouvez l'afficher dans la console pour vérification).**

---

### **Étape 11 : Vérification des mots saisis via l'API**

#### **11.1 Vérifier que le mot saisi existe en interrogeant l'API**

**Modifier `validateAttempt` :**

```javascript
function validateAttempt() {
    // ... (code précédent)
    fetch(`https://localhost:7110/api/Lexique/verify?word=${attempt}`)
        .then(response => response.json())
        .then(exists => {
            if (!exists) {
                showMessage(`Le mot "${attempt}" n'existe pas.`);
                // Effacer la ligne actuelle
                rowInputs.forEach(input => input.value = '');
            } else {
                processAttempt(rowInputs, attempt);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la vérification du mot:', error);
        });
}
```

#### **11.2 Gérer les cas où le mot n'existe pas**

- **Déjà implémenté ci-dessus.**

**Test :**

- **Saisir un mot inexistant et vérifier que le message s'affiche et que la ligne est effacée.**

---

### **Étape 12 : Améliorations finales et tests globaux**

#### **12.1 Optimiser le code et améliorer l'interface utilisateur**

- **Réviser le code pour éliminer les redondances.**
- **Améliorer le style CSS pour une meilleure apparence.**
- **Ajouter des animations ou des effets visuels si désiré.**

#### **12.2 Effectuer des tests globaux**

- **Tester le jeu dans différents scénarios : victoire, échec, mots inexistants, etc.**
- **Vérifier le comportement sur différents navigateurs si possible.**

---

## **Conclusion**

En suivant ce plan détaillé, vous pouvez démontrer l'avancement du projet étape par étape, en mettant l'accent sur chaque fonctionnalité et en fournissant des tests pour valider chaque cas. Cela permet de montrer clairement comment le projet évolue et comment chaque partie contribue au résultat final.

---

**N'hésitez pas** à me faire savoir si vous avez besoin de plus de détails sur une étape spécifique ou si vous souhaitez approfondir certains aspects du code ou des tests. Je suis là pour vous aider à réussir votre démonstration.

Bonne chance avec votre projet !