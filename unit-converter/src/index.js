//some useful ratios
const feetPerMeter = 3.28084;
const gallonPerLiter = 0.264172;
const poundPerKilo = 2.20462;

const lengthConversion = document.getElementById("length-conversion");
const volumeConversion = document.getElementById("volume-conversion");
const massConversion = document.getElementById("mass-conversion");

const inputContainer = document.getElementById("input-box");

//listen for clicks on convert button
const convertBtn = document.getElementById("convert-btn");
convertBtn.addEventListener("click", function(){
    if(inputContainer.value && !isNaN(Number(inputContainer.value))){
        renderConversions(Number(inputContainer.value));
    }
})

//conversion functions
function meterToFeet(n){
    console.log((feetPerMeter * n));
    return (feetPerMeter * n).toFixed(3);
}
function feetToMeter(n){
    return ((1 / feetPerMeter) * n).toFixed(3);
}
function literToGallon(n){
    return (gallonPerLiter * n).toFixed(3);
}
function gallonToLiter(n){
    return ((1 / gallonPerLiter) * n).toFixed(3);
}
function kiloToPound(n){
    return (poundPerKilo * n).toFixed(3);
}
function poundToKilo(n){
    return ((1 / poundPerKilo) * n).toFixed(3);
}

function generateConversionStr(baseValue, valueImperial, imperialDesc, valueMetric, metricDesc){
    return `${baseValue} ${metricDesc} = ${valueImperial} ${imperialDesc} | ${baseValue} ${imperialDesc} = ${valueMetric} ${metricDesc}`

}
function renderConversions(baseValue){
    //get conversions
    const lengthStr = generateConversionStr(baseValue, meterToFeet(baseValue), "feet", feetToMeter(baseValue), "meters");
    const volumeStr = generateConversionStr(baseValue, literToGallon(baseValue), "gallons", gallonToLiter(baseValue), "liters");
    const massStr = generateConversionStr(baseValue, kiloToPound(baseValue), "pounds", poundToKilo(baseValue), "kilos");

    //display on screen
    lengthConversion.textContent = lengthStr;
    volumeConversion.textContent = volumeStr;
    massConversion.textContent = massStr;
}



