let homeScore = 0;
let guestScore = 0;

let homeEl = document.getElementById("home-score");
let guestEl = document.getElementById("guest-score");

function updateHome(i){
    //update internal variable
    homeScore += i;
    //update score on page
    homeEl.textContent = homeScore;
}

function updateGuest(i){
    guestScore += i;
    guestEl.textContent = guestScore;
}

function reset(){
    homeScore = 0;
    homeEl.textContent = homeScore;

    guestScore = 0;
    guestEl.textContent = guestScore;
}
