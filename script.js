

document.addEventListener("DOMContentLoaded", function() {
    let colorDisplay = document.getElementById('color-display');
    let pointsDisplay = document.getElementById('points');
    let levelButtons = document.querySelectorAll('.level-button');
    let cardsContainer = document.getElementById('game-board');
    let resetButton = document.getElementById('reset');
    let cards;
    let targetColor;
    let points = 0;
    let level = 'easy';
    let numCards;

    function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function setupBoard() {
        cardsContainer.innerHTML = '';
        for (let i = 0; i < numCards; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.addEventListener('click', checkColor);
            cardsContainer.appendChild(card);
        }
        cards = document.querySelectorAll('.card');
    }

    function setupGame() {
        let colors = [];
        for (let i = 0; i < numCards; i++) {
            colors.push(randomColor());
        }
        targetColor = colors[Math.floor(Math.random() * colors.length)];
        colorDisplay.textContent = targetColor;
        cards.forEach((card, index) => {
            card.style.backgroundColor = colors[index];
        });
    }

    function checkColor() {
        if (this.style.backgroundColor === targetColor) {
            alert('Success!');
            points += level === 'easy' ? 10 : level === 'medium' ? 20 : 30;
        } else {
            alert('Wrong color! Try again.');
        }
        pointsDisplay.textContent = points;
    }

    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            level = button.id;
            if (level === 'easy') {
                numCards = 3;
            } else if (level === 'medium') {
                numCards = 6;
            } else if (level === 'hard') {
                numCards = 9;
            }
            setupBoard();
            setupGame();
        });
    });

    resetButton.addEventListener('click', () => {
        points = 0;
        pointsDisplay.textContent = points;
        levelButtons[0].click(); 
    });


    levelButtons[0].click(); 
});
