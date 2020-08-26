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

prepareDeck.then(function getJSON(response) {
    const json = response.json();
    return json;
})
.then(function getDeckID(json) {
    deckID = json.deck_id;
    console.log(deckID);
});

function drawCard(selectedDeck, scoreForDeck, player) {
    const drawCardURL = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1"

    fetch(drawCardURL).then(function getJSON(response) {
        const json = response.json();
        return json;
    })
    .then(function drawCard(json) {
        var img = document.createElement("img");
        img.src = json.cards[0].image;
        
        json.cards[0].value.match(/[A-Z]/g) !== null ? scoreForDeck =  scoreForDeck + 10: scoreForDeck = scoreForDeck + Number(json.cards[0].value);
        
        if(player === "human") {
            scoreCount[1].innerText = Number(scoreCount[1].innerText) + scoreForDeck;
        } else {
            scoreCount[0].innerText = Number(scoreCount[0].innerText) + scoreForDeck;
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


player.addEventListener("click", function(event){
    if(event.target.tagName === "BUTTON"){
        if(event.target.innerText === "Hit"){
            drawCard(playerDeck, playerScore, "human");
            drawCard(dealersDeck, dealerScore, "AI");
        } else if (event.target.innerText === "Play Again") {
            resetGame();
        }
    }
});