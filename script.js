const DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
const prepareDeck = fetch(DECK_URL);

var dealersDeck = document.querySelector(".dealers-deck");
var deckID;

var dealersOptions = ["hit", "stand"];


prepareDeck.then(function getJSON(response) {
    const json = response.json();
    return json;
})
.then(function getDeckID(json) {
    deckID = json.deck_id;
    console.log(deckID);
});



