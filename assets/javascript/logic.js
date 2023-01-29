// --------------- DATA ------------------------------------------
let timeLeft = 29;
let questionIndex = 0;
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
const finalScore = document.getElementById("final-score");
const endScreen = document.getElementById("end-screen");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("submit");

// --------------- Append Elements -------------------------------

// --------------- FUNCTIONS -------------------------------------

/*------- START -------*/

// Put empty array in localStorage if there's nothing there
const init = () => {
  const highScores = JSON.parse(localStorage.getItem("highscores"));
  if (!highScores) {
    localStorage.setItem("highscores", JSON.stringify([]));
  }
};

init();

// Transition from start-screen to screen with questions (questionScreen)
const displayQuestionScreen = () => {
  startScreen.classList.add("hide");
  questionScreen.classList.remove("hide");
};

// Implementation of the countdown to be used for the timeLeft (in startQuiz function)
const setCountDown = () => {
  if (timeLeft > 0) {
    if (questionIndex >= questions.length - 1) {
      clearInterval(setCountDown);
      // Why infinite Loop?
      console.log("timeleft" + timeLeft);
      console.log("score " + currentScore);
      return;
    } else {
      time.textContent = timeLeft;
      timeLeft--;
    }
  } else {
    time.textContent = "00";
    clearInterval(setCountDown);
    endQuiz();
  }
  return;
};

// Regroup functions needed for the quiz to start
const startQuiz = () => {
  setInterval(setCountDown, 1000);
  displayQuestionScreen();
  populateQuiz();
  return;
};

/*------- QUESTIONS -------*/
// Populate #questions div with current question (based on questionIndex) and corresponding options
// No need to loop through the questions array to capture each question object individually
// since in handleAnswer() we increment questionIndex after each question (as long as we haven't reached the last one)

const generateQuestionTitle = (question) => {
  questionTitle.textContent = question.title;
};

// Answers will be displayed as list items inside buttons (answerDiv > listOfOptions > optionBtn > listItem)
// and all of them will have a class of "wrong" except the correct one, which will have a class of "correct"
const generateOptions = (question) => {
  question.answers.forEach((option) => {
    let listItem = document.createElement("li");
    let optionBtn = document.createElement("button");
    listItem.innerText = option;
    listItem.className =
      listItem.innerText === question.correctAnswer ? "correct" : "wrong";
    optionBtn.appendChild(listItem);
    listOfOptions.appendChild(optionBtn);
    answerDiv.appendChild(listOfOptions);
    console.log(optionBtn.textContent);
  });
};

const populateQuiz = () => {
  generateQuestionTitle(questions[questionIndex]);
  generateOptions(questions[questionIndex]);
};

const clearFeedback = () => {
  // target already existing text div created in the parent function and remove it
  const feedbackText = document.getElementById("feedback-div");
  questionScreen.removeChild(feedbackText);
};

const generateFeedback = (feedbackText) => {
  // create text div and append it to the container
  const feedbackDiv = document.createElement("div");
  const feedbackWord = document.createElement("p");
  feedbackWord.textContent = feedbackText;
  feedbackDiv.setAttribute("id", "feedback-div");
  feedbackDiv.appendChild(horizontalLine);
  feedbackDiv.appendChild(feedbackWord);
  answerDiv.appendChild(feedbackDiv);
  answerDiv.after(feedbackDiv);
};

const handleAnswer = () => {
  if (questionIndex >= questions.length - 1) {
    currentScore = timeLeft;
    return endQuiz();
  }

  questionIndex++;
  listOfOptions.textContent = "";

  questionTitle.textContent = "";
  populateQuiz();
  setTimeout(clearFeedback, 1000);
};

// Event delegation - only take into account clicks on buttons
const validateUserAnswer = () => {
  questionScreen.addEventListener("click", function (event) {
    let target = event.target;

    // valid clicks are only those on the answers
    if (target.className === "correct") {
      generateFeedback("Correct!");
      handleAnswer();
      return true;
    } else if (target.className === "wrong") {
      generateFeedback("Wrong!");
      timeLeft -= 10;
      handleAnswer();
      return false;
    }
  });
};

// function to get the arr from localStorage
// push the object with the user initials and score
// put the arr back in LS

const submitScore = () => {
  const currentUserInitials = initialsInput.value;
  // get array of highscores objects
  let highScores = JSON.parse(localStorage.getItem("highscores"));
  console.log(highScores);
  //create an object to store userInitials
  const currentUserHighscore = { currentUserInitials, currentScore };

  // Add current user's details to the highscores array
  highScores.push(currentUserHighscore);

  localStorage.setItem("highscores", JSON.stringify(highScores));
};

const endQuiz = () => {
  clearInterval(setCountDown);
  startScreen.classList.add("hide");
  questionScreen.classList.add("hide");
  finalScore.textContent = currentScore;
  endScreen.classList.remove("hide");
};

// --------------- FLOW / EVENT LISTENERS ------------------------------------------

startBtn.addEventListener("click", startQuiz);
validateUserAnswer();
submitBtn.addEventListener("click", submitScore);
