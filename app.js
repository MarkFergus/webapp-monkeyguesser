import { images } from "/images.js";

const btnNew = document.getElementById("btn-new");
const btnEnter = document.getElementById("btn-enter");
const btnNext = document.getElementById("btn-next");
const btnReveal = document.getElementById("btn-reveal");
const message = document.getElementById("message");
const messageMain = document.getElementById("message-main");
const messageSub = document.getElementById("message-sub");
const messageTick = document.getElementById("message-tick");
const messageX = document.getElementById("message-x");
const inputField = document.getElementById("input-field");

let newImageArr, newImageSrc, answer;

function setNewImage() {
    let prevImageSrc = newImageSrc;
    newImageArr = images[Math.floor(Math.random() * images.length)];
    newImageSrc = newImageArr[0];
    if (newImageSrc === prevImageSrc) {
        return setNewImage();
    } else {
        document.getElementById("monkey-image").src = newImageSrc;
        document.getElementById("input-box").style.visibility = "visible";
        btnReveal.style.display = "inline-block";
        clear();
    }
}

setNewImage();

function checkAnswer() {
    let input = inputField.value.toLowerCase();
    answer = newImageArr[1];
    clear();
    if (input === answer) {
        messageTick.style.display = "inline-block";
        messageX.style.display = "none";
        message.style.color = "#6efc16";
        messageMain.textContent = "Correct!";
        messageSub.textContent = `${answer.toUpperCase()} from ${newImageArr[2]}!`;
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
    answer = newImageArr[1];
    message.style.color = "#0d6efd";
    messageMain.textContent = `It's ${answer.toUpperCase()} from ${
        newImageArr[2]
    }!`;
    messageSub.textContent = "";
    messageX.style.display = "none";
    messageTick.style.display = "none";
    btnReveal.disabled = false;
}

function clear() {
    messageMain.textContent = "";
    messageSub.textContent = "";
    inputField.value = "";
    messageX.style.display = "none";
    messageTick.style.display = "none";
    btnReveal.disabled = false;
}

// to fix bug where animation does not restart
function resetAnimation() {
    messageX.animation = "none";
    messageX.offsetHeight;
    messageX.animation = null;
}

// btnNew.addEventListener("click", setNewImage);
btnEnter.addEventListener("click", checkAnswer);
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkAnswer();
    }
});
btnReveal.addEventListener("click", revealAnswer);
btnNext.addEventListener("click", setNewImage);
