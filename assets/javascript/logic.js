// TO-DO LIST
/*
- review list number in generateOptions()

*/
// - an array of user objects > to store user.initials and user.score at the end 
// - an array of score 
// - an array of initials 
// ----'


// --------------- DATA ------------------------------------------
let timer = 59;
let currentScore 


// --------------- Create elements that we will need -------------

// For feedbackText after each question
let feedbackText = document.createElement("p");
let horizontalLine = document.createElement("hr"); 
let list = document.createElement("ul");

// --------------- Select Elements -------------------------------

// On #start-screen
let startBtn = document.getElementById("start");
let time = document.getElementById("time");
let startScreen = document.getElementById("start-screen");

// On #questions screen
let questionsDiv = document.getElementById("questions");
let questionTitle = document.getElementById("question-title");
let answerDiv = document.getElementById("choices");



// --------------- Add content to Elements -----------------------
feedbackText = "";


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

// Populate #questions div with current question and options
// We will then loop through the questions array to capture each question object individually
const generateQuestion = (question) => {
    questionTitle.textContent = question.title;
}
const generateOptions = (question) => {
    question.answers.forEach(option => {
        let listItem = document.createElement("li")
        let optionBtn = document.createElement("button");
        optionBtn.innerText = `${question.answers.indexOf(option) + 1}. ${option}`;
        listItem.append(optionBtn);
        list.append(listItem);
        answerDiv.append(list);
    });
}


// Regroup functions needed for the quiz to start
const startQuiz = () => {
    const launchCountDown = setInterval(createCountDown, 1000);
    displayQuestionScreen();

    //test
    generateQuestion(questions[0]);
    generateOptions(questions[0])

}


// --------------- MAIN ------------------------------------------
startBtn.addEventListener("click", startQuiz);