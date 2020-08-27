const DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
const prepareDeck = fetch(DECK_URL);

var dealersDeck = document.querySelector(".dealers-deck");
var deckID;
var dealerScore = 0; 

var player = document.querySelector(".player");
var playerDeck = document.querySelector(".players-deck");
var playerScore = 0;

var dealersOptions = ["hit", "stand"];

var scoreCount = document.querySelectorAll(".score-count");
var display = document.querySelector(".display");

prepareDeck.then(function getJSON(response) {
    const json = response.json();
    return json;
})
.then(function getDeckID(json) {
    deckID = json.deck_id;
});

function drawCard(selectedDeck, player) {
    const drawCardURL = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1"

    fetch(drawCardURL).then(function getJSON(response) {
        const json = response.json();
        return json;
    })
    .then(function drawCard(json) {
        let img = document.createElement("img");
        img.src = json.cards[0].image;

        let cardScore = 0;
        
        json.cards[0].value.match(/[A-Z]/g) !== null ? cardScore += 10: cardScore += Number(json.cards[0].value);
        
        if(player === "human") {
            scoreCount[1].innerText = Number(scoreCount[1].innerText) + cardScore;
            gameWon(player, Number(scoreCount[1].innerText));
        } else {
            scoreCount[0].innerText = Number(scoreCount[0].innerText) + cardScore;
            gameWon(player, Number(scoreCount[0].innerText));
        }
        selectedDeck.appendChild(img);      
    }); 
}

function resetGame(){
    playerDeck.innerHTML = "";
    dealersDeck.innerHTML = "";
    scoreCount[0].textContent = "0";
    scoreCount[1].textContent = "0";
}

function displayMove(player, move) {
    display.innerText = player + " move  : " + move;
}

function gameWon(player, score){
    if(score == 21) {
        display.innerText = player + " wins. ";
        setTimeout(resetGame, 1000);
    } else if (score > 21) {
        display.innerText = "Bust. " + player + " looses.";
        setTimeout(resetGame, 1000);
    }
}

function AIMove(){
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


player.addEventListener("click", function(event){
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