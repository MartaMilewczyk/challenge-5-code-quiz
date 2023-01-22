
let startScreenEl = document.querySelector(".start")
let startButton = document.querySelector("#start");
let questionCtnEl = document.querySelector("#questions-ctn")
let questionEl = document.querySelector("#question-title")
let answerButton = document.querySelector("#answer-buttons")
let nextButton = document.querySelector("#next");


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
        if (ans.correct) {
            btn.dataset.correct = ans.correct;
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
    renderQuestion(shuffleQuestion[0]);
}

function selectAnswer(event) {
    let selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButton.children).forEach(function (btn) {
        setStatusClass(button, button.dataset.correct)
    })
    nextButton.classList.remove("hide");
}


