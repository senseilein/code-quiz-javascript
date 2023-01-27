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
let currentScore = 0;
let currentQuestion = {};

// --------------- Create elements that we will need -------------

// For feedbackText after each question
let correctFeedbackText = document.createElement("p");
let wrongFeedbackText = document.createElement("p");
let horizontalLine = document.createElement("hr");

// To display answer options
let listOfOptions = document.createElement("ul");

// --------------- Select Elements -------------------------------

// On #start-screen
let startBtn = document.getElementById("start");
let time = document.getElementById("time");
let startScreen = document.getElementById("start-screen");

// On #questions screen
let questionDiv = document.getElementById("questions");
let questionTitle = document.getElementById("question-title");
let answerDiv = document.getElementById("choices");

// On #end-screen
let endScreen = document.getElementById("end-screen");

// --------------- Add content to Elements -----------------------
correctFeedbackText.innerText = "Correct!";
wrongFeedbackText.innerText = "Wrong!";

// --------------- Append Elements -------------------------------

// --------------- FUNCTIONS -------------------------------------

// Transition from start-screen to screen with questions
const displayQuestionScreen = () => {
  startScreen.classList.add("hide");
  questionDiv.classList.remove("hide");
};

// Implementation of the count down to be used in the setInterval()
const createCountDown = () => {
  if (timer > 0) {
    time.textContent = timer;
    timer--;
  } else {
    time.textContent = 00;
    clearInterval(createCountDown);
  }
};

// Populate #questions div with current question and options
// We will then loop through the questions array to capture each question object individually
const generateQuestion = (question) => {
  questionTitle.textContent = question.title;
};

// Answers will be displayed as list items inside buttons
const generateOptions = (question) => {
  question.answers.forEach((option) => {
    let listItem = document.createElement("li");
    let optionBtn = document.createElement("button");
    listItem.innerText = option;
    listItem.className =
      listItem.innerText === question.correctAnswer ? "correct" : "wrong";
    optionBtn.append(listItem);
    listOfOptions.append(optionBtn);
    answerDiv.append(listOfOptions);
  });
};

const generateFeedback = (feedbackText) => {
  answerDiv.appendChild(horizontalLine);
  answerDiv.appendChild(feedbackText);
};

// Not correct
// const disableAnswersAfterFeedback = () => {
//   // remove classes so that nothing happens if user clicks again
//   // const listItemWithClass = document.querySelectorAll("li");
//   listItemWithClass.classList.remove("wrong", "correct");
// };

// Event delegation
const validateUserAnswer = () => {
  questionDiv.addEventListener("click", function (event) {
    let target = event.target;
    if (target.className === "correct") {
      console.log("yeah " + target.textContent);
      generateFeedback(correctFeedbackText);
      currentScore++;
      console.log("current score " + currentScore);
      return true;
    } else if (target.className === "wrong") {
      console.log(" NO wrong! " + target.textContent);
      generateFeedback(wrongFeedbackText);
      timer -= 10;
      return false;
    } else {
      console.log("meh");
    }
  });
};

const clearQuestion = () => {
  questionTitle.textContent = "";
  answerDiv.removeChild(listOfOptions);
};

// Regroup functions needed for the quiz to start
const startQuiz = () => {
  const launchCountDown = setInterval(createCountDown, 1000);
  displayQuestionScreen();
};

const populateQuiz = () => {
  //test
  generateQuestion(questions[0]);
  generateOptions(questions[0]);
};

const endQuiz = () => {
  startScreen.classList.add("hide");
  questionDiv.classList.add("hide");
  endScreen.classList.remove("hide");
};

// --------------- MAIN ------------------------------------------

startBtn.addEventListener("click", startQuiz);

/* For each question, we will 
- populate the quiz then clear it once user clicked the correct target 
> do this as long as there are questions available

*/
populateQuiz();
validateUserAnswer(); // and display feedback
//disableAnswersAfterFeedback();
// clearQuestion();

// endQuiz();
