
let player = {
    name: "Guest",
    chips: 500
}

let cards = [];
let sum = 0;
let hasUnder21 = true;
let hasBlackjack = false;
let hasDrawn = false;
let hasAce = false;

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = player.name + ": $" + player.chips;

//start a new round of blackjack
function newGame(){
    //add to balance if won last game
    if (hasUnder21 && hasDrawn){
        player.chips += 100;
    }
 
    //reset values and draw two cards
    hasUnder21 = true;
    hasBlackjack = false;
    hasDrawn = false;
    hasAce = false;


    let firstCard = randomCard();
    let secondCard = randomCard();

    if (firstCard === 1 || secondCard === 1){
        hasAce = true;
    }
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    
    //display updated player stats
    playerEl.textContent = player.name + ": $" + player.chips;

    renderGame();
}


//update text on screen based on current state of game
function renderGame(){
    //update list of player cards
    cardsEl.textContent = "Cards:";
    for(let i = 0; i < cards.length; i++){
        cardsEl.textContent += " " + cards[i]
    }

    //update sum of cards
    sumEl.textContent = "Sum: " + sum
    //ace can be 1 or 11
    if (hasAce) {
        sumEl.textContent += "/" + (sum + 10);
    }

    //move to next game state based on current state
    let message = ""
    if (sum > 21) {
        message = "You busted! Want to play another?";
        hasUnder21 = false;

        //give them some pity chips if they lose all of them
        player.chips -= 100;
        if (player.chips < 100){
            givePityChips();
            message ="Looks like you don't have enough chips. Don't worry, I've loaned you some!"
        }
    } else if (sum === 21 || (hasAce && sum + 10 === 21)){
        message = "Nice job. Want to play another?";
        hasBlackjack = true;
        player.chips += 100;
    } else {
        message = "Still under. Draw another card?";
   }

    messageEl.textContent = message;
}

//determine the message and result of the game
function givePityChips(){
    player.chips += 250;
}


//draw a random card, which has a value between 1-13
//in blackjack, face cards are worth 10, and aces are worth 1/11
function randomCard(){
    let value = Math.floor(Math.random() * 13) + 1
    let card = value;
    if (value >= 10){
        card = 10;
    } else if (value === 1){
        hasAce = true;
    }

    return card;
}


//draw a new card and re-render game state
//only let them draw a card if they are still in the game
function drawCard(){
    if (hasUnder21 && !hasBlackjack){
        let card = randomCard();
        sum += card;
        cards.push(card);
        hasDrawn = true;
        renderGame();
    }
}

