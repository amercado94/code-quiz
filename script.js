//Create var's that will link the buttons to the html
var startBtnEl = document.querySelector("#startBtn");
var quizContainer = document.querySelector("#quiz");
var resultsContainer = document.querySelector("#results");
var submitBtnEl = document.querySelector("#submit");
var timerEl = document.getElementById('countdown');
var userInitials = document.querySelector(".user-initials");
var userInitialsEl = document.querySelector("#initials");
var highScore = document.querySelector("#highScore");
var scoreBoardEl = document.getElementById("scoreBoard");
var initialsDisplay = document.getElementById("gang");
//var initialsInput = userInitials.value; 
//var initials = initialsInput.value;


var timeLeft = 30;
var score = 0;
var qIndex = 0;

var myQuestions = [
    {
        question: "Who invented JavaScript?",
        answers: {
            a: "Douglas Crockford",
            b: "Sheryl Sandberg",
            c: "Brendan Eich"
        },
        correctAnswer: "c"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
            a: "Node.js",
            b: "TypeScript",
            c: "npm"
        },
        correctAnswer: "c"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: {
            a: "Angular",
            b: "jQuery",
            c: "RequireJS",
            d: "ESLint"
        },
        correctAnswer: "d"
    }
];

//Create Start Button function
function startQuiz() {
    var output = [];
    //   myQuestions.forEach(
    //     (currentQuestion, questionNumber) => {
    //         var answers = [];
    //         for(letter in currentQuestion.answers){
    //             console.log(letter, currentQuestion.answers[letter])
    //             answers.push(
    //                 `<label>
    //                     <input type="radio" name="question${questionNumber}" value="${letter}"></input>
    //                     ${letter} :
    //                     ${currentQuestion.answers[letter]}
    //                 </label>`
    //             );
    //         }
    //         output.push(
    //             `<div class="question"> ${currentQuestion.question} </div>
    //             <div class="answers"> ${answers.join('')} </div>`
    //         );
    //     }
    //   );
    var answers = [];

    for (letter in myQuestions[qIndex].answers) {
        answers.push(
            `<button value=${letter} class='answerBtn'>
        ${letter} :
        ${myQuestions[qIndex].answers[letter]}
    </button>`
            // `<label>
            //     <input type="radio" name="question${myQuestions[0]}" value="${letter}"></input>
            //     ${letter} :
            //     ${myQuestions[0].answers[letter]}
            // </label>`
        );
    }
    output.push(
        `<div class="question"> ${myQuestions[qIndex].question} </div>
    <div class="answers"> ${answers.join('')} </div>`
    );
    quizContainer.innerHTML = output.join('');
}


//Start Button event listener
startBtnEl.addEventListener("click", function () {
    startQuiz();
    startBtnEl.style.display = 'none';
    countdown();

});

document.addEventListener("click", function (event) {
    // submitBtnEl.addEventListener("click", function (event) {
    console.log(event.target.className);
    if (event.target.className === 'answerBtn') {
        var choice = event.target.value;
        if (choice === myQuestions[qIndex].correctAnswer) {
            score++
        } else {
            timeLeft -= 5
        }

        // if (qIndex < myQuestions.length - 1) {
        // }
        if (qIndex < myQuestions.length - 1) {
            qIndex++
            startQuiz()
        } else {
          endQuiz();   
        }

    }
});

function endQuiz() {
    quizContainer.style.display = 'none';
    timerEl.remove();
    document.getElementById("name").style.display = "initial";
    document.getElementById("initials").style.display = "initial";
    document.getElementById("save").style.display = "initial";



}

save.addEventListener("click", function(event) {
    localStorage.setItem("initials", userInitialsEl.value);
    console.log(userInitialsEl.value);
    localStorage.setItem("score", score.valueOf);
    console.log(score.valueOf());
    if (initials === "") {
        displayMessage("error", "Initials cannot be blank");
    }
    renderScores();
})

//Add Time
function countdown() {

    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds left."

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timerEl.remove();
            endQuiz();
        }
    }, 1000);
}

//Save information to local storage
function highScore() {
    var scoreBoard = score;
    scoreBoard.textContent = newScore;
}

function renderScores() {
    var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("score");
    document.querySelector(".user-initials").style.display = "initial";
    document.getElementById("gang").style.display = "initial";


    if (initialsDisplay) {
        initialsDisplay.textContent = initials;
    return;
    }

    

}

//Present the save information in local storage
// function renderScores() {
//     var initials = localStorage.getItem("initials");
//     console.log(initials);
//     //maybe try to append the scoreboard content
//     document.getElementById("scoreBoard").style.display = "initial";
//     //scoreBoardEl.textContent = "score";
    
//     document.querySelector(".user-initials").style.display = "initial";
    

    
// }

// function displayScores(type, message) {
//     msgDiv.textContent = message;
//     msgDiv.setAttribute("class", type);
// }