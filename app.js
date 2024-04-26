const content = document.getElementById("main-content");
const modal = document.getElementById('myModal');
const btnLogo = document.getElementById("main_nav__logo");
const monkeyImage = document.getElementById("monkey-image");
const inputBox = document.getElementById("input-box");
const inputField = document.getElementById("input-field");
const score = document.getElementById("score");
const remainingImgs = document.getElementById("remainingImgs");
const btnModalStart = document.getElementById("btn-modal-start");
const btnEnter = document.getElementById("btn-enter");
const btnNewGame= document.getElementById("btn-newgame-box");
const btnNewGame1= document.getElementById("btn-newgame1");
const btnReveal = document.getElementById("btn-reveal");
const btnNext = document.getElementById("btn-next");
const message = document.getElementById("message");
const messageMain = document.getElementById("message-main");
const messageSub = document.getElementById("message-sub");
const messageTick = document.getElementById("message-tick");
const messageX = document.getElementById("message-x");
const modalForm = document.getElementById("modal-form");

let newImageArr, newImageSrc, answer, monkeyName, monkeyTroop, currScore = 0;
let monkeys = images;
let checkedValues = [];

init();

function init() {
    content.style.visibility = "hidden";
    btnReveal.disabled = true;
}

function startNewGame() {
    content.style.visibility = "visible";
    modal.style.visibility = "hidden";
    remainingImgs.textContent = monkeys.length;
    monkeys = images;
    score.textContent = 0;
    filterArr();
    setRandomImage();
}

function filterArr() { 
    console.log('Filtering monkeys...');
    const filteredArray = monkeys.filter(subArray => subArray.some(val => checkedValues.includes(val)));
    monkeys = filteredArray;
    console.log(`There are ${monkeys.length} monkeys to guess`);
}

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
    // btnReveal.disabled = true;
    updateStats();
    clear();
}

function updateStats() {
    score.textContent = currScore;
    remainingImgs.textContent = monkeys.length;
}

function removeItemFromArr(arr, i) {
    let start = arr.slice(0, i);
    let end = arr.slice(i + 1);
    return [...start, ...end];
}

function checkAnswer() {
    let userInput = inputField.value.toLowerCase().trimEnd();
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
    // btnReveal.disabled = true;
    btnEnter.disabled = true;
    currScore = (currScore+1);
    console.log(currScore);
    updateStats();
}

function displayWrongMsg() {
    messageTick.style.display = "none";
    messageX.style.display = "inline-block";
    message.style.color = "#eb655c";
    messageMain.textContent = "Wrong!";
    messageSub.textContent = `It's ${monkeyName.toUpperCase()} from ${monkeyTroop}!`;
    // btnReveal.disabled = false;
    btnEnter.disabled = true;
    currScore = (currScore-1);
    updateStats();
}

function displayEndMsg() {
    messageX.style.display = "none";
    messageTick.style.display = "none";
    message.style.color = "white";
    messageMain.textContent = "The End!";
    messageSub.textContent = `You scored ${currScore} !!`
    // btnReveal.disabled = true;
    btnNext.disabled = true;
    btnEnter.disabled = true;
}

function revealAnswer() {
    message.style.color = "white";
    messageMain.textContent = `It's ${monkeyName.toUpperCase()} from ${monkeyTroop}!`;
    messageSub.textContent = "";
    messageX.style.display = "none";
    messageTick.style.display = "none";
    // btnReveal.disabled = false;
    btnEnter.disabled = true;
}

function clear() {
    messageMain.textContent = "";
    messageSub.textContent = "";
    inputField.value = "";
    messageX.style.display = "none";
    messageTick.style.display = "none";
    // btnReveal.disabled = false;
    btnEnter.disabled = false;
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

function checkFormSelections() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedValues.push(checkbox.name);
        }
    });
}

function openModal() {
    modal.style.visibility = "visible";
}

btnNewGame.addEventListener("click", openModal);
btnNext.addEventListener("click", checkForImages);
btnEnter.addEventListener("click", checkAnswer);
// document.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//         checkAnswer();
//     }
// });
btnReveal.addEventListener("click", revealAnswer);

// Close the modal when clicking outside of it
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.visibility = 'hidden'; // Back to invisible
    }
});
//prevent default page reload, ensure one selection is made, and obtain selection array
modalForm.addEventListener('submit', (event) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let atLeastOneChecked = false;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            atLeastOneChecked = true
        }
    });
    if (!atLeastOneChecked) {
        event.preventDefault();
        alert('Please select at least one checkbox.');
    } else {
        checkedValues = [];
        event.preventDefault(); 
        checkFormSelections();
        startNewGame();
    }
});
