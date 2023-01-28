// --------------- DATA ------------------------------------------
let timer = 59;
let currentScore = 0;

// --------------- Create elements that we will need -------------

// For feedbackText after each question
const correctFeedbackText = document.createElement("p");
const wrongFeedbackText = document.createElement("p");
const horizontalLine = document.createElement("hr");

// To display answer options
const listOfOptions = document.createElement("ul");

// --------------- Select Elements -------------------------------

// On #start-screen
const startBtn = document.getElementById("start");
const time = document.getElementById("time");
const startScreen = document.getElementById("start-screen");

// On #questions screen
const questionScreen = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const answerDiv = document.getElementById("choices");

// On #end-screen
const endScreen = document.getElementById("end-screen");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("submit");

let questionIndex = 0;

// --------------- Append Elements -------------------------------

// --------------- FUNCTIONS -------------------------------------

/*------- START -------*/
// Transition from start-screen to screen with questions (questionScreen)
const displayQuestionScreen = () => {
  startScreen.classList.add("hide");
  questionScreen.classList.remove("hide");
};

// Implementation of the count down to be used in the setInterval()
const createCountDown = () => {
  if (timer > 0) {
    time.textContent = timer;
    timer--;
  } else {
    time.textContent = 00;
    clearInterval(createCountDown);
    endQuiz();
  }
};

// Regroup functions needed for the quiz to start
const startQuiz = () => {
  setInterval(createCountDown, 1000);
  displayQuestionScreen();
  populateQuiz();
};

/*------- QUESTION -------*/
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

const clearFeedback = () => {
  answerDiv.removeChild(horizontalLine);

  // target already existing text div, created in the parent function and remove it
  const feedbackText = document.getElementById("feedback-div");
  answerDiv.removeChild(feedbackText);
};

const generateFeedback = (feedbackText) => {
  answerDiv.appendChild(horizontalLine);

  // create text div and append it to the container
  const feedbackDiv = document.createElement("div");
  feedbackDiv.setAttribute("id", "feedback-div");
  feedbackDiv.innerText = feedbackText;
  answerDiv.appendChild(feedbackDiv);
  setTimeout(clearFeedback, 1000);
};

const handleAnswer = () => {
  if (questionIndex >= questions.length - 1) {
    currentScore = timer;
    return endQuiz();
  }

  questionIndex++;
  listOfOptions.textContent = "";

  setTimeout(() => {
    questionTitle.textContent = "";
    populateQuiz();
  }, 1000);
};

// Event delegation
const validateUserAnswer = () => {
  questionScreen.addEventListener("click", function (event) {
    let target = event.target;

    if (target.className === "correct") {
      generateFeedback("Correct!");
      handleAnswer();
      return true;
    } else if (target.className === "wrong") {
      generateFeedback("Wrong!");
      timer -= 10;
      handleAnswer();
      return false;
    }
  });
};

const populateQuiz = () => {
  generateQuestion(questions[questionIndex]);
  generateOptions(questions[questionIndex]);
};

const submitScore = () => {
  const userInitials = initialsInput.value;
  console.log(userInitials, "-", currentScore);
};

const endQuiz = () => {
  startScreen.classList.add("hide");
  questionScreen.classList.add("hide");
  endScreen.classList.remove("hide");
};

// --------------- EVENT LISTENERS ------------------------------------------
validateUserAnswer();

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", submitScore);
