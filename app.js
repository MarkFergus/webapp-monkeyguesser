const images = [
    [
        "https://i.ibb.co/r0sQXJK/Mango-Jalamango-May-2022.jpg",
        "mango",
        "Jalamango",
    ],
    ["https://i.ibb.co/LZpkzY0/yoda-koko-feb2024.jpg", "yoda", "Koko"],
    ["https://i.ibb.co/D4ms2xj/timmy-gismo-jan2024.jpg", "timmy", "Gismo"],
    ["https://i.ibb.co/QQj3cFz/riccardo-koko-feb2024.jpg", "riccardo", "Koko"],
    ["https://i.ibb.co/YQCGFDL/atlas-koko-feb2024.jpg", "atlas", "Koko"],
    ["https://i.ibb.co/s2ryW2X/darby-james-feb2024.jpg", "darby", "James"],
    ["https://i.ibb.co/swBPQ7M/tk-skunkey-mar2024.jpg", "tk", "Skunkey"],
    ["https://i.ibb.co/7pb5GyK/samber-koko-mar2024.jpg", "samber", "Koko"],
    ["https://i.ibb.co/0y283ZQ/kathleen-h-B-mar2024.jpg", "kathleen", "H&B"],
    ["https://i.ibb.co/30x9pZf/June-Global-16-03-2024-3.jpg", "june", "Global"],
    ["https://i.ibb.co/GsmknC9/anita-skunkey-mar2024.jpg", "anita", "Skunkey"],
    ["https://i.ibb.co/pfrhLmj/elora-skunkey-mar2024.jpg", "elora", "Skunkey"],
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
    console.log(newImageSrc);
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
    answer = newImageArr[1];
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
