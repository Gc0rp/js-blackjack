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


// function displayDeck(scoreForDeck, player) {
//     console.log(scoreCount[1].textContent + scoreForDeck);
//     (player == "human") ? scoreCount[1].textContent = "Player Score : " + scoreForDeck : scoreCount[0].value = scoreForDeck;
// }

function drawCard(selectedDeck, scoreForDeck, player) {
    const drawCardURL = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1"

    fetch(drawCardURL).then(function getJSON(response) {
        const json = response.json();
        return json;
    })
    .then(function drawCard(json) {
        var img = document.createElement("img");
        img.src = json.cards[0].image;
        // scoreForDeck = scoreForDeck + Number(json.cards[0].value);

        // (Number(json.cards[0].value) === NaN) ? scoreForDeck = scoreForDeck + 10 : scoreForDeck = scoreForDeck + Number(json.cards[0].value);

        (player === "human") ? scoreForDeck = 
        json.cards[0].value.match(/[A-Z]/g) !== null ? scoreForDeck = scoreForDeck + 10 : scoreForDeck = scoreForDeck + Number(json.cards[0].value)
        
        selectedDeck.appendChild(img); 

        console.log(scoreForDeck);       
    }); 
}


player.addEventListener("click", function(event){
    if(event.target.tagName === "BUTTON"){
        if(event.target.innerText === "Hit"){
            drawCard(playerDeck, playerScore);
            console.log(playerScore);
            // displayDeck(playerScore, "human");

            drawCard(dealersDeck, dealerScore);
            // displayDeck(dealerScore, "AI");
        }
    }
});