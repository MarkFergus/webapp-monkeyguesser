const images = [
    "merlin.JPG",
    "terk.JPG",
    "timothy.JPG",
    "gimli.JPG",
    "pinky.JPG",
];
let newImage = "";
let answer = "";
let streak = 0;

const btnNew = document.getElementById("btn-new");
const btnEnter = document.getElementById("btn-enter");
const btnReveal = document.getElementById("btn-reveal-answer");
const message = document.getElementById("message");
const inputField = document.getElementById("input-field");

function setNewImage() {
    let prevImage = newImage;
    newImage = `images/${images[Math.floor(Math.random() * images.length)]}`;
    if (newImage === prevImage) {
        return setNewImage();
    } else {
        document.getElementById("monkey-image").src = newImage;
        document.getElementById("input-box").style.visibility = "visible";
        clear();
    }
}

function checkAnswer() {
    let input = inputField.value.toLowerCase();
    answer = newImage.slice(7, -4);
    if (input === answer) {
        streak += 1;
        if (streak === 5) {
            message.textContent = "Correct!! 😁 That's 5 in a row!!";
        } else {
            message.textContent = "Correct!! 😁";
            btnReveal.style.visibility = "hidden";
            console.log(streak);
        }
    } else {
        streak = 0;
        message.textContent = "Wrong! 🫢 Try again!";
        btnReveal.style.visibility = "visible";
    }
}

function revealAnswer() {
    message.textContent = "The correct answer is " + answer.toUpperCase();
    btnReveal.style.visibility = "hidden";
}

function clear() {
    message.textContent = "";
    inputField.value = "";
    btnReveal.style.visibility = "hidden";
}

btnNew.addEventListener("click", setNewImage);
btnEnter.addEventListener("click", checkAnswer);
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkAnswer();
    }
});
btnReveal.addEventListener("click", revealAnswer);
