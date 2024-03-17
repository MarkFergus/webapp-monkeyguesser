const images = [
    [
        "https://i.ibb.co/r0sQXJK/Mango-Jalamango-May-2022.jpg",
        "mango",
        "Jalamango",
    ],
    ["https://ibb.co/W2KxWGH", "yoda", "Koko"],
    ["https://ibb.co/4WC9r60", "timmy", "Gismo"],
    ["https://ibb.co/NCnd36Q", "riccardo", "Koko"],
    ["https://ibb.co/9gDjkwr", "Atlas", "Koko"],
    ["https://ibb.co/f274D2T", "Darby", "James"],
    ["https://ibb.co/jMp5Gt1", "tk", "Skunkey"],
    ["https://ibb.co/wQYXK64", "samber", "Koko"],
    ["https://ibb.co/pjwGpZn", "kathleen", "H&B"],
    ["https://ibb.co/khLs4C3", "June", "Global"],
    ["https://ibb.co/f274D2T", "Darby", "James"],
    ["https://ibb.co/VH6DJMx", "anita", "Skunkey"],
    ["https://ibb.co/8r4Y7hg", "elora", "Skunkey"],
];
let newImageArr = [];
let newImageSrc = "";
let newImageAns = "";
let answer = "";

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
    if (input === answer) {
        messageTick.style.display = "inline-block";
        messageX.style.display = "none";
        message.style.color = "#6efc16";
        messageMain.textContent = "Correct!";
        messageSub.textContent = `${answer.toUpperCase()} from ${
            newImageArr[2]
        }!`;
        btnReveal.disabled = true;
    } else {
        messageTick.style.display = "none";
        messageX.style.display = "inline-block";
        message.style.color = "#eb655c";
        messageMain.textContent = "Wrong!";
        messageSub.textContent = "Try again!";
        btnReveal.disabled = false;
    }
}

function revealAnswer() {
    message.style.color = "white";
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

btnNew.addEventListener("click", setNewImage);
btnEnter.addEventListener("click", checkAnswer);
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkAnswer();
    }
});
btnReveal.addEventListener("click", revealAnswer);
btnNext.addEventListener("click", setNewImage);
