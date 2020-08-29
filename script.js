const DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
const prepareDeck = fetch(DECK_URL);

var dealersDeck = document.querySelector(".dealers-deck");
var deckID;
var dealerScore = 0; 

var player = document.querySelector(".player");
var playerDeck = document.querySelector(".players-deck");
var playerScore = 0;

var scoreCount = document.querySelectorAll(".score-count");
var display = document.querySelector(".display");

var hit = document.querySelector('.js-player-hit');
var stand = document.querySelector('.js-stand');

prepareDeck.then(function getJSON(response) {
    const json = response.json();
    return json;
})
.then(function getDeckID(json) {
    deckID = json.deck_id;
});

function displayScore(player, cardScore) {
    if(player === "human") {
        scoreCount[1].innerText = Number(scoreCount[1].innerText) + cardScore;
        gameWon(player, Number(scoreCount[1].innerText));
    } else {
        scoreCount[0].innerText = Number(scoreCount[0].innerText) + cardScore;
        gameWon(player, Number(scoreCount[0].innerText));
    }
}

function drawCard(selectedDeck, player) {
    const drawCardURL = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1"

    fetch(drawCardURL).then(function getJSON(response) {
        const json = response.json();
        return json;
    })
    .then(function drawCard(json) {
        let img = document.createElement("img");
        img.src = json.cards[0].image;

        let div = document.createElement("div");
        div.className = "ace-card";

        let aceButton_eleven = document.createElement("button");
        aceButton_eleven.textContent = "11";
        aceButton_eleven.classList.add("btn", "ace-btn");

        let aceButton_one = document.createElement("button");
        aceButton_one.textContent = "1";
        aceButton_one.classList.add("btn", "ace-btn");

        let cardScore = 0;

        if(json.cards[0].value !== "ACE") {
            json.cards[0].value.match(/[A-Z]/g) !== null ? cardScore += 10: cardScore += Number(json.cards[0].value);
        }

        console.log(json.cards[0].value);

        if(json.cards[0].value === "ACE") {

            div.appendChild(aceButton_one);

            disableButtons();

            div.addEventListener('click', function pointClicked() {
                if(event.target.tagName === "BUTTON") {
                    if(event.target.textContent === "1") {
                        displayScore(player, 1);

                        aceButton_one.disabled = true;
                        aceButton_eleven.disabled = true;
                        
                        aceButton_one.classList.add("ace-btn-disabled");
                        aceButton_eleven.classList.add("ace-btn-disabled");
                        enableButtons();

                    } else if (event.target.textContent === "11") {
                        displayScore(player, 11);
                        
                        aceButton_one.disabled = true;
                        aceButton_eleven.disabled = true;
                        
                        aceButton_one.classList.add("ace-btn-disabled");
                        aceButton_eleven.classList.add("ace-btn-disabled");
                        enableButtons();
                    }
                }
            });

            div.appendChild(aceButton_eleven);

            div.appendChild(img);
            selectedDeck.appendChild(div);

        } else {
            selectedDeck.appendChild(img);
        }

        displayScore(player, cardScore);
      
    }); 
}

function resetGame() {
    playerDeck.innerHTML = "";
    dealersDeck.innerHTML = "";
    scoreCount[0].textContent = "0";
    scoreCount[1].textContent = "0";

    enableButtons();
}

function displayMove(player, move) {
    display.innerText = player + " move  : " + move;
}

function disableButtons() {
    hit.disabled = true;
    stand.disabled = true;
}

function enableButtons() {
    hit.disabled = false;
    stand.disabled = false;
}

function gameWon(player, score) {
    if(score == 21) {
        display.innerText = player + " wins. ";
        disableButtons();
        setTimeout(resetGame, 1000);
    } else if (score > 21) {
        display.innerText = "Bust. " + player + " looses.";
        disableButtons();
        setTimeout(resetGame, 1000);
    }
}

function AIMove() {
    let dealerScore = Number(scoreCount[0].innerText); 
    // If the score is less than 17, then Hit. 
    if (dealerScore < 17) {
        drawCard(dealersDeck, "AI");
        displayMove("AI", "Hit");
    } else {
        // Pick a random number between 0 and 1, If 1 is selected then Hit else Stand. 
        if(Math.round(Math.random() * 1) === 1) {
            drawCard(dealersDeck, "AI");
            displayMove("AI", "Hit");
        } else {
            // Stand
            displayMove("AI", "Stand")
        }
    }
}


player.addEventListener("click", function(event) {
    if(event.target.tagName === "BUTTON"){
        if(event.target.innerText === "Hit"){
            drawCard(playerDeck, "human");
            AIMove();
        } else if(event.target.innerText === "Stand") {
            AIMove();
        } else if (event.target.innerText === "Play Again") {
            resetGame();
        }
    }
});