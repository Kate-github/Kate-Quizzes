document.getElementById("btnStart").addEventListener("click", function () {
    hideAllPages();
    questionsDiv.classList.add('current');
    currentScore = startingScore;
    currentQuestionCounter = 0;
    showQuestion();
});

document.getElementById('btnSubmit').addEventListener('click', function () {
    const inputInitials = document.getElementById("Initials");
    const initials = inputInitials.value;
    const newScore = {
        'initials': initials,
        'score': currentScore
    };
    highScores.push(newScore);
    inputInitials.value="";
    showHighScore();
});
document.getElementById('btnBack').addEventListener('click', function () {
    showIntro();
});
document.getElementById('btnReset').addEventListener('click', function () {
    highScores=[];
    showHighScore();
});

function showQuestion() {
    showHeader();
    startTime = new Date();
    const questionText = document.getElementById('QuestionText');
    const choicesDiv = document.getElementById('Choices');
    scoreDiv.textContent = currentScore;
    choicesDiv.innerHTML = '';
    const currentQuestion = listofQuestions[currentQuestionCounter];
    questionText.textContent = currentQuestion.questionText;

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        const currentChoice = currentQuestion.choices[i];
        const choiceDiv = document.createElement("div");
        choiceDiv.dataset.isCorrect = currentChoice.isCorrect;
        choiceDiv.innerHTML = currentChoice.text;
        choiceDiv.addEventListener('click', function () {
            const resultDiv = document.getElementById('Result');
            if (choiceDiv.dataset.isCorrect === 'true') {
                resultDiv.classList.remove('wrong');
                resultDiv.classList.add('correct');
                resultDiv.textContent = 'Answer to previous question was correct!';
            } else {
                resultDiv.classList.remove('correct');
                resultDiv.classList.add('wrong');
                resultDiv.textContent = 'Answer to previous question was wrong!';
                // calculate new score
                const now = new Date();
                const timeElapsed = Math.round((now.getTime() - startTime.getTime()) / 1000);
                currentScore = currentScore - timeElapsed;
            }

            if (currentScore <= 0 || currentQuestionCounter >= listofQuestions.length - 1) {
                showGameOver();
                return;
            } else {
                currentQuestionCounter++;
                // show next question
                showQuestion();
            }
        });
        choicesDiv.appendChild(choiceDiv);
    }

}

function hideHeader() {
    header.style.display = "none";
}
function showHeader(){
    header.style.display ="block";
}
function showIntro() {
    showHeader();
    hideAllPages();
    introDiv.classList.add('current');
    scoreDiv.textContent = currentScore;
}

function showGameOver() {
    showHeader();
    hideAllPages();
    gameOverDiv.classList.add('current');
    // show finalscore
    const finalScoreDiv = document.getElementById("finalScore");
    finalScoreDiv.textContent = currentScore;
}

function showHighScore() {
    hideAllPages();
    hideHeader();
    highScoresDiv.classList.add('current');
    const highScoreslist = document.getElementById("ListOfHighScores");
    highScoreslist.innerHTML = "";
    const sortedScores = highScores.sort(function (a, b) {
        if (b) {
            return b.score - a.score;
        }
        return a.score
    });
    for (let i = 0; i < sortedScores.length; i++) {
        const newScore = document.createElement("div");
        const score = sortedScores[i];
        // {'initials':'KP', score:60} "KP - 60"
        newScore.textContent = score.initials + " - " + score.score;
        highScoreslist.appendChild(newScore);
    }
}

function hideAllPages() {
    const pages = document.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        page.classList.remove('current');
    }
}

const startingScore = 75;
let currentScore = startingScore;
let startTime;
let highScores =  [];
let currentQuestionCounter = 0;
const introDiv = document.getElementById('Intro');
const questionsDiv = document.getElementById('Quiz');
const gameOverDiv = document.getElementById('Game-Over');
const highScoresDiv = document.getElementById('HighScore');
const scoreDiv = document.getElementById("Score");
const header = document.getElementsByTagName("header")[0];

const listofQuestions = [
    {
        questionText: "How do you declare a variable?",
        choices: [
            { text: "var", isCorrect: false },
            { text: "let", isCorrect: false },
            { text: "const", isCorrect: false },
            { text: "All the above", isCorrect: true }
        ]

    },

    {
        questionText: "What are variables used for in JavaScript?",
        choices: [
            { text: "Storing numbers, dates, or other values", isCorrect: true },
            { text: "Varying randomely", isCorrect: false },
            { text: "Causing high-school algebra flashback", isCorrect: false },
            { text: "None of the above", isCorrect: false },
        ]
    },
    {
        questionText: "What should appear after the Script tag?",
        choices: [
            { text: "The &lt;/Script&gt;", isCorrect: true },
            { text: "The &lt;Script&gt;", isCorrect: false },
            { text: "The END statement", isCorrect: false },
            { text: "None of the above", isCorrect: false },
        ]
    },
    {
        questionText: "Which of the following are capabilities of function in JavaScript?",
        choices: [
            { text: "Return a value", isCorrect: false },
            { text: "Accept parameters and Return a value", isCorrect: true },
            { text: "Accept parameters", isCorrect: false },
            { text: "None of the above", isCorrect: false },
        ]
    },
    {
        questionText: "Which of the following are capabilities of function in JavaScript?",
        choices: [
            { text: "Return a value", isCorrect: false },
            { text: "Accept parameters and Return a value", isCorrect: true },
            { text: "Accept parameters", isCorrect: false },
            { text: "None of the above", isCorrect: false },
        ],
    },
    {
        questionText: "Inside which HTML element do we put the JavaScript?",
        choices: [
            { text: "&lt;js&gt;", isCorrect: false },
            { text: "&lt;scripting&gt;", isCorrect: false },
            { text: "&lt;script&gt;", isCorrect: true },
            { text: "&lt;javascript&gt;", isCorrect: false },
        ]
    },

]

showIntro();