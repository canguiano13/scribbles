const modal = document.getElementById("modal")
const modalCloseBtn = document.getElementById("modal-close-btn")
const form = document.getElementById("consent-form")
const modalText = document.getElementById("modal-text")
const declineBtn = document.getElementById("decline-btn")
const modalBtnContainer = document.getElementById("modal-choice-btns")

//display the cookie popup after 1.5s
setTimeout(function(){
    modal.style.display = "inline"
}, 1500);

//close cookie popup when user clicks on "X"
modalCloseBtn.addEventListener("click", function(){
    modal.style.display = "none"
})

//swap accept and decline buttons when hovered
declineBtn.addEventListener("mouseover", function(){
    modalBtnContainer.classList.toggle("reverse")
});

//prevent default form behavior
//update modal text on form submission
form.addEventListener("submit", function(e){
    e.preventDefault();

    modalText.innerHTML = `<div class="modal-inner-loading">
    <img src="images/loading.svg" class="loading">
    <p id="upload-text">
        Uploading your data to the dark web...
    </p>
    </div>`

    const formData = new FormData(form);
    const name = formData.get("modalName")

    setTimeout(function(){
        document.getElementById("upload-text").textContent = "Making the sale..."
    }, 1500)


    setTimeout(function(){
        document.getElementById("modal-inner").innerHTML = `<h2>Thanks <span class="modal-display-name">${name}</span>, you sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
        <img src="images/pirate.gif">
        </div>
        `
        modalCloseBtn.disabled = false;
    }, 3000)

})
console.log('hovered')
