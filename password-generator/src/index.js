const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let pass1El = document.getElementById("first-password");
let pass2El = document.getElementById("second-password");

//generate a random 12-character password
function randomPassword(){
    let s = ""
    //could update to take length as param
    for (let l = 0; l < 12; l++){
        idx = Math.floor(Math.random() * characters.length);
        s += characters[idx]
    }
    return s
}

function updateText(pass1, pass2){
    pass1El.textContent = pass1;
    pass2El.textContent = pass2;
}

function generate(){
    let pass1 = randomPassword();
    let pass2 = randomPassword();
    updateText(pass1, pass2);
}
