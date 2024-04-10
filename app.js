const monkeyImage = document.getElementById("monkey-image");
const inputBox = document.getElementById("input-box");
const inputField = document.getElementById("input-field");
const btnEnter = document.getElementById("btn-enter");
const btnNewGame= document.getElementById("btn-newgame-box");
const btnReveal = document.getElementById("btn-reveal");
const btnNext = document.getElementById("btn-next");
const message = document.getElementById("message");
const messageMain = document.getElementById("message-main");
const messageSub = document.getElementById("message-sub");
const messageTick = document.getElementById("message-tick");
const messageX = document.getElementById("message-x");

let newImageArr, newImageSrc, answer, monkeyName, monkeyTroop;
let monkeys = images;

setRandomImage();

function checkForImages() {
    monkeys.length > 0
        ? setRandomImage()
        : displayEndMsg()
}

function setRandomImage() {
    let randIdx = Number([Math.floor(Math.random() * monkeys.length)]);
    monkey = monkeys[randIdx];
    monkeyImage.src = monkey[0];
    monkeyName = monkey[1];
    monkeyTroop = monkey[2];
    monkeys = removeItemFromArr(monkeys, randIdx);
    btnReveal.style.display = "inline-block";
    clear();
}

function removeItemFromArr(arr, i) {
    let start = arr.slice(0, i);
    let end = arr.slice(i + 1);
    return [...start, ...end];
}

function checkAnswer() {
    let userInput = inputField.value.toLowerCase();
    clear();
    resetAnimation();
    userInput === monkeyName 
        ? displayCorrectMsg()
        : displayWrongMsg()
}

function displayCorrectMsg() {
    messageTick.style.display = "inline-block";
    messageX.style.display = "none";
    message.style.color = "#6efc16";
    messageMain.textContent = "Correct!";
    messageSub.textContent = `${monkeyName.toUpperCase()} from ${monkeyTroop}!`;
    btnReveal.disabled = true;
}

function displayWrongMsg() {
    messageTick.style.display = "none";
    messageX.style.display = "inline-block";
    message.style.color = "#eb655c";
    messageMain.textContent = "Wrong!";
    messageSub.textContent = "Try again!";
    btnReveal.disabled = false;
}

function displayEndMsg() {
    messageX.style.display = "none";
    messageTick.style.display = "none";
    message.style.color = "white";
    messageMain.textContent = "The End!";
    messageSub.textContent = "Go on, have another go...";
    btnNewGame.style.visibility= "visible";
}


function revealAnswer() {
    message.style.color = "white";
    message.style.color = "#0d6efd";
    messageMain.textContent = `It's ${monkeyName.toUpperCase()} from ${monkeyTroop}!`;
    messageSub.textContent = "";
    messageX.style.display = "none";
    messageTick.style.display = "none";
    btnReveal.disabled = false;
}

function clear() {
    btnNewGame.style.visibility= "hidden";
    messageMain.textContent = "";
    messageSub.textContent = "";
    inputField.value = "";
    messageX.style.display = "none";
    messageTick.style.display = "none";
    btnReveal.disabled = false;
}

// bug fix to allow animation to restart
function resetAnimation() {
    messageX.animation = "none";
    messageTick.animation = "none";
    messageX.offsetHeight;
    messageTick.offsetHeight;
    messageX.animation = null;
    messageTick.animation = null;
}

btnEnter.addEventListener("click", checkAnswer);
btnNewGame.addEventListener("click", () => {
    console.log('new game pressed');
    monkeys = images;
    setNewImage();
});
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkAnswer();
    }
});
btnReveal.addEventListener("click", revealAnswer);
btnNext.addEventListener("click", checkForImages);
