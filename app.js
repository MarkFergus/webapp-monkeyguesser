const btnNew = document.getElementById("btn-new");
const btnEnter = document.getElementById("btn-enter");
const btnNewGame= document.getElementById("btn-newgame-box");
const btnNext = document.getElementById("btn-next");
const btnReveal = document.getElementById("btn-reveal");
const message = document.getElementById("message");
const messageMain = document.getElementById("message-main");
const messageSub = document.getElementById("message-sub");
const messageTick = document.getElementById("message-tick");
const messageX = document.getElementById("message-x");
const inputField = document.getElementById("input-field");

let newImageArr, newImageSrc, answer, monkeyName, monkeyTroop;
let monkeys = images;

setNewImage();

function setNewImage() {
    if (monkeys.length > 0) {
        // get a random index from monkeys array
        randIdx = Number([Math.floor(Math.random() * monkeys.length)]);
        monkey = monkeys[randIdx];
        // set monkey details according to new index
        newImageSrc = monkey[0];
        monkeyName = monkey[1];
        monkeyTroop = monkey[2];
        // remove monkey from monkeys array
        monkeys = removeMonkey(monkeys, randIdx);
        console.log(monkeys);
        // set new image 
        document.getElementById("monkey-image").src = newImageSrc;
        document.getElementById("input-box").style.visibility = "visible";
        btnReveal.style.display = "inline-block";
        clear();
    } else {
        messageX.style.display = "none";
        messageTick.style.display = "none";
        message.style.color = "white";
        messageMain.textContent = "";
        messageSub.textContent = "!! No images remaining !!";
        btnNewGame.style.visibility= "visible";
    }
}

function removeMonkey(arr, i) {
    let start = arr.slice(0, i);
    let end = arr.slice(i + 1);
    return [...start, ...end];
}

function checkAnswer() {
    let input = inputField.value.toLowerCase();
    clear();
    if (input === monkeyName) {
        messageTick.style.display = "inline-block";
        messageX.style.display = "none";
        message.style.color = "#6efc16";
        messageMain.textContent = "Correct!";
        messageSub.textContent = `${monkeyName.toUpperCase()} from ${monkeyTroop}!`;
        btnReveal.disabled = true;
    } else {
        resetAnimation();
        messageTick.style.display = "none";
        messageX.style.display = "inline-block";
        message.style.color = "#eb655c";
        messageMain.textContent = "Wrong!";
        messageSub.textContent = "Try again!";
        btnReveal.disabled = false;
        messageX.classList.add("shake");
    }
    
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

// bug fix where animation does not restart
function resetAnimation() {
    messageX.animation = "none";
    messageX.offsetHeight;
    messageX.animation = null;
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
btnNext.addEventListener("click", setNewImage);
