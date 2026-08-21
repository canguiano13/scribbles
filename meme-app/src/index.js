
import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")
const gifsOnly = document.getElementById("gifs-only-option")
const submitBtn = document.getElementById("get-image-btn")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModal = document.getElementById("meme-modal")
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadios.addEventListener("change", highlightCheckedOption)
memeModalCloseBtn.addEventListener("click", () => {memeModal.style.display = "none"})
submitBtn.addEventListener("click", renderCat)

//highlight a selected radio button div
function highlightCheckedOption(e){
    //remove highlight from all radio buttons
    for(let r of document.getElementsByClassName("radio")){
        r.classList.remove("highlight")
    }

    //add to clicked element
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

//render a cat to the DOM
function renderCat(){
    const catObject = getSingleCatObject()
    console.log(catObject)

    let catImg = catObject.image
    let catAltText = catObject.alt

    memeModalInner.innerHTML = `<img class="cat-img" src="./images/${catImg}" alt=${catAltText}>`
    memeModal.style.display = "flex"
}

//select a single cat object from a list of cat objects
function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1){
        return catsArray[0]
    } 
    return catsArray[Math.floor(Math.random() * catsArray.length)]
}

//get a list of cat objects with matching emotion, filtering by GIFs is user requests
function getMatchingCatsArray(){
    if(document.querySelector("input[type=radio]:checked")){
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value
        const wantsGifOnly = gifsOnly.checked;

        const matchingCats = catsData.filter(function(cat){
            if (wantsGifOnly){
                return cat.isGif && cat.emotionTags.includes(selectedEmotion)
            }
            return cat.emotionTags.includes(selectedEmotion)
        })
        return matchingCats
    }
}

//transform cat objects into list of emotions
function getEmotionsArray(cats){
    const emotionsArray = []

    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

//render radio buttons for each emotion in div
function renderEmotionRadios(cats){
    const emotions = getEmotionsArray(cats)

    let radioItems = ""
    for (let emotion of emotions){
        radioItems += `<div class="radio">
                        <label for="${emotion}">${emotion}</label>
                        <input type="radio" value="${emotion}" id="${emotion}" name="emotion-radios"/>
                       </div>`

    }
    emotionRadios.innerHTML = radioItems
}
renderEmotionRadios(catsData)
