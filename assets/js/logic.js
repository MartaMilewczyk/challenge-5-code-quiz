
let startScreenEl = document.querySelector(".start")
let startButton = document.querySelector("#start");
let questionCtnEl = document.querySelector("#questions-ctn")
let questionEl = document.querySelector("#question-title")
let answerButton = document.querySelector("#answer-buttons")
let nextButton = document.querySelector("#next");

let points = 0;
let questionIndex = 0;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', function () {
    nextQuestion();
})

let shuffleQuestion = questionsArray.sort( function() { 
    return Math.random() - 0.5; 
});

function startQuiz() {
    startScreenEl.classList.add("hide");
    questionCtnEl.classList.remove("hide");
    shuffleQuestion;
    nextQuestion();
}

function renderQuestion(que) {
    questionEl.textContent = que.question;
    que.answers.forEach(function(ans) {
        const btn = document.createElement("button");
        btn.textContent = ans.answer;
        btn.classList.add("button");
        // console.log(ans);
        if (ans.isCorrect) {
            btn.dataset.isCorrect = ans.isCorrect;
        }
        btn.addEventListener("click", selectAnswer);
        answerButton.appendChild(btn);
    });
}

function reset() {
    nextButton.classList.add("hide");
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function nextQuestion() {
    reset();
    renderQuestion(shuffleQuestion[questionIndex]);
}

function selectAnswer(event) {
    let selectedButton = event.target;
    console.log(selectedButton);
    const correct = selectedButton.dataset.isCorrect;
    console.log(correct);

    if (correct) {
        console.log("correct");
        points++;
    } else {
        console.log("incorrect");
        points--;
    }
    questionIndex++;
// console.log(points);
    if (questionIndex < questionsArray.length) {
    nextQuestion();
    } else {
        console.log("end page");
        // go to high scores?
    }
}


function setStatusClass(params) {
    
}