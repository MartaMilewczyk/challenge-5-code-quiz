
let startScreenEl = document.querySelector(".start")
let startButton = document.querySelector("#start");
let questionCtnEl = document.querySelector("#questions-ctn")
let questionEl = document.querySelector("#question-title")
let answerButton = document.querySelector("#answer-buttons")

startButton.addEventListener('click', startQuiz);

shuffleQuestion = questionsArray.sort( function() { 
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

function nextQuestion() {
    reset()
    renderQuestion(shuffleQuestion[0]);
}

function selectAnswer(event) {

}

function reset() {

}