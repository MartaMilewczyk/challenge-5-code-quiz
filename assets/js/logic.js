// Query selectors declarations
const startScreenEl = document.querySelector(".start");
const startButton = document.querySelector("#start");
const questionCtnEl = document.querySelector("#questions-ctn");
const questionEl = document.querySelector("#question-title");
const answerButton = document.querySelector("#answer-buttons");
const timerEl = document.querySelector("#time");
const endScreenEl = document.querySelector("#end-screen");
const submitButton = document.querySelector("#submit");
const initialsEl = document.querySelector("#initials");
const finalScoreEl = document.querySelector("#final-score")
const userName = JSON.parse(localStorage.getItem("username")) || [];

const button = document.querySelector(".button")

// Variables declaration
let questionIndex = 0;
let score = 0;
let timerCount;
let timer;

// Event listeners
startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', submit);

// Shuffling questions
let shuffleQuestion = questionsArray.sort( function() { 
    return Math.random() - 0.5; 
});

// Start function
function startQuiz() {
    startScreenEl.classList.add("hide");
    questionCtnEl.classList.remove("hide");
    timerCount = 60;
    shuffleQuestion;
    nextQuestion();
    startTimer();
};

// Question rendering
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
};

// Next question looping function
function nextQuestion() {
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
    renderQuestion(shuffleQuestion[questionIndex]);
};

// Answer selecting function
function selectAnswer(event) {
    let selectedButton = event.target;
    let timePenalty = 5;
    if (selectedButton.dataset.isCorrect) {
        console.log("OK");
        score++;
        button.setAttribute("style", "background-color: green");
    } else {
        console.log("Wrong");
        button.setAttribute("style", "background-color: red");
        timerCount -= timePenalty;
    };
    questionIndex++;
    if (questionIndex < questionsArray.length) {
        nextQuestion();
    } else if (questionIndex === questionsArray.length) {
        endScreenEl.classList.remove("hide");
        questionCtnEl.classList.add("hide");
    }
};

// Timer function
function startTimer() {
    // Sets timer
    timer = setInterval( function() {
        timerCount--;
        timerEl.textContent = timerCount;
    // Time penalty if answer is wrong
        if (timerCount >= 0) {
            // timerCount -= consumeTime;

        }
    // Test if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
        }
    }, 1000);
};

// Submit button function
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
};
