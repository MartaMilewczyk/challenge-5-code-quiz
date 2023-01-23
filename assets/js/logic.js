const startScreenEl = document.querySelector(".start");
const startButton = document.querySelector("#start");
const questionCtnEl = document.querySelector("#questions-ctn");
const questionEl = document.querySelector("#question-title");
const answerButton = document.querySelector("#answer-buttons");
const timerEl = document.querySelector("#time");
const endScreenEl = document.querySelector("#end-screen");
const submitButton = document.querySelector("#submit");
const initialsEl = document.querySelector("#initials");
// const highScoresEl = document.querySelector("highscores");
const userName = JSON.parse(localStorage.getItem("username")) || [];

let questionIndex = 0;
let score = 0
let timerCount;
let timer;

startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', submit);

let shuffleQuestion = questionsArray.sort( function() { 
    return Math.random() - 0.5; 
});

function startQuiz() {
    startScreenEl.classList.add("hide");
    questionCtnEl.classList.remove("hide");
    timerCount = 60;
    shuffleQuestion;
    nextQuestion();
    startTimer();
}

function renderQuestion(que) {
    questionEl.textContent = que.question;
    que.answers.forEach(function(ans) {
        const btn = document.createElement("button");
        btn.textContent = ans.answer;
        btn.classList.add("button");
        if (ans.isCorrect) {
            btn.dataset.isCorrect = ans.isCorrect;
        };
        btn.addEventListener("click", selectAnswer);
        answerButton.appendChild(btn);
    });
}

function nextQuestion() {
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
    renderQuestion(shuffleQuestion[questionIndex]);
}

function selectAnswer(event) {
    let selectedButton = event.target;
    let selectedOption = event.target.value;
    let correct = selectedButton.dataset.isCorrect;
    if (selectedOption === correct) {
        selectedButton.setAttribute("style", "background-color: green");
    } else {
        selectedButton.setAttribute("style", "background-color: red");
        timerCount -= 10;
    };
    questionIndex++;
    if (questionIndex < questionsArray.length) {
        nextQuestion();
    } else if (questionIndex === questionsArray.length) {
        endScreenEl.classList.remove("hide");
        questionCtnEl.classList.add("hide");
    }
}

function startTimer() {
    // Sets timer
    timer = setInterval( function() {
        timerCount--;
        timerEl.textContent = timerCount;
    // Time penalty if answer is wrong
        if (timerCount >= 0) {
            // timerCount -= consumeTime;
            console.log("consumed time");
        }
    // Test if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
        }
    }, 1000);
}

function submit(event) {
    event.preventDefault();
    endScreenEl.classList.add("hide");
    startScreenEl.classList.remove("hide");
    let player = {
        initials: initialsEl.value.toUpperCase(),
        scores: score,
    };
    userName.push(player);
    localStorage.setItem("username", JSON.stringify(userName));
    initialsEl.value = "";
}
