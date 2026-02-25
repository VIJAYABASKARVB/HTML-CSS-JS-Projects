//id = outputcopy -> for the generated output;
//id = myrange -> for slide range;
//id = range-value -> slider value change;
//id = uppercase -> id for check box for uppercase;
//id = lowercase -> id for check box for lowercase;
//id = numbers -> id for check box for numbers;
//id = symbols -> id for check box for symbols;

const generateButton = document.getElementById("generateBtn");

const outputField = document.getElementById("outputcopy");

const uppercaseCheck = document.getElementById("uppercase"); 
const lowercaseCheck = document.getElementById("lowercase"); 
const numbersCheck = document.getElementById("numbers"); 
const symbolsCheck = document.getElementById("symbols"); 

const sliderRange = document.getElementById("myrange");
const sliderValue = document.getElementById("range-value");

let passwordLength = Number(sliderRange.value); // initialize with default

sliderRange.addEventListener("input",function (){
    passwordLength = Number(sliderRange.value);
    sliderValue.textContent = sliderRange.value;
});

function generatePasswords(){
    let chars = "";
    let result = "";

    if(uppercaseCheck.checked){
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if(lowercaseCheck.checked){
        chars += "abcdefghijklmnopqrstuvwxyz";
    }
    if(numbersCheck.checked){
        chars += "1234567890";
    }
    if(symbolsCheck.checked){
        chars += "!@#$%^&*";
    }

    if (chars.length === 0) {
        return;
    }

    for(let i=0;i<passwordLength;i++){
        result += chars[Math.floor(Math.random()*chars.length)];
    }

    outputField.value = result;
}

generateButton.addEventListener("click", generatePasswords);
