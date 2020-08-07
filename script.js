const DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
const prepareDeck = fetch(DECK_URL);

var dealersDeck = document.querySelector(".dealers-deck");
var deckID;

var player = document.querySelector(".player");
var playerDeck = document.querySelector(".players-deck");

var dealersOptions = ["hit", "stand"];

prepareDeck.then(function getJSON(response) {
    const json = response.json();
    return json;
})
.then(function getDeckID(json) {
    deckID = json.deck_id;
    console.log(deckID);
});


function drawCard(){
    const drawCardURL = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1"

    fetch(drawCardURL).then(function getJSON(response) {
        const json = response.json();
        return json;
    })
    .then(function drawCard(json) {
        var img = document.createElement("img");
        img.src = json.cards[0].image;

        playerDeck.appendChild(img); 
    }) 
}


player.addEventListener("click", function(event){
    if(event.target.tagName === "BUTTON"){
        if(event.target.innerText === "Hit"){
            drawCard();
        }
    }
});