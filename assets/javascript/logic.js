// Needed to create // -

// - an array of user objects > to store user.initials and user.score at the end 
// - an array of score 
// - an array of initial 
// ----'


// --------------- DATA ------------------------------------------
let timer = 59;
let currentScore 


// --------------- Create elements that we will need -------------

// For feedback after each question
let rightWrongParagraph = document.createElement("p");
let horizontalLine = document.createElement("hr");


// --------------- Select Elements -------------------------------

// On #start-screen
let startBtn = document.getElementById("start");
let time = document.getElementById("time");
let startScreen = document.getElementById("start-screen");

// On #questions screen
let questionsDiv = document.getElementById("questions");
let questionTitle = document.getElementById("question-title");
let answerDiv = document.getElementById("choices");
let answers = document.getElementsByClassName("choices");

// --------------- Add content to Elements -----------------------
rightWrongParagraph = "";


// --------------- Append Elements -------------------------------



// --------------- FUNCTIONS -------------------------------------


// Transition from start-screen to screen with questions
const displayQuestionScreen = () => {
    startScreen.classList.add("hide");
    questionsDiv.classList.remove("hide");
}

// Implementation of the count down to be used in the setInterval()
const createCountDown = () => {
    if(timer > 0){
    time.textContent = timer;
    timer--;
    } else {
        time.textContent = 0;
        clearInterval(createCountDown);
    }
}

// Regroup functions needed for the quiz to start
const startQuiz = () => {
    const launchCountDown = setInterval(createCountDown, 1000);
    displayQuestionScreen();
}


// --------------- MAIN ------------------------------------------
startBtn.addEventListener("click", startQuiz)
