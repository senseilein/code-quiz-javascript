<!-- // Needed to create
// - <p> containing a vertical line and the word "Wrong!" with data attribute right/wrong to be reuse
// - score variable to store score
// - an array of user objects > to store user.initials and user.score at the end
// - an array of score
// - an array of initial
// * might need to create 4 buttons in questionsDiv to be used for each question
// * currentQuestion variable

// create array of local storage

// REMOVE functions argument on populatequiz etc()
// As long there is questions available, populateQuiz()
// After ValidateUSerAnswer() we need to Disable buttons or remove list item class
-->

// ------------------------'

# DIFFICULTIES ENCOUNTERED

    * Had to change answers object into an array because of looping issues
    * When wrapping button in li , the number is not included in button, needs to do it the other way round
    * Once feedback text appear for 1 question, disable all button/li items

# START

## LOCAL STORAGE PART I (need to develop that)

    * IF available localStorage.getitem() {user object, containing initials and score}
      ELSE just return

## IF user CLICKS on `#start` button

### 1. START COUNTDOWN

    * INITIALIZE timer at 59 seconds
    * START countdown

### 2. DISPLAY THE CORRECT DIV #start-screen

    * CHANGE class of the div #start-screen to hide
    * CHANGE class of div #questions so that it's visible

### 3. LOOP through the array of questions to show them on screen

#### STEP 1 - POPULATE QUIZ AREA

    Loop through [questions]
    WHILE time > 0 AND question[i] is <= questions.length:

        FOR EACH {question} in [questions], do the following:

            1. currentQuestion = questions[i];

            2. function to populate the questions and the answer options
                a. generateQuestion()
                    * CHANGE textContent or innerText? of <h2> in questionScreen to currentQuestion.title
                b. generateOptions()
                    * CREATE a <ul> in which we will append 4 <li> wrapped in <button>
                    * ASSIGN each <li> in the questionScreen the value of each item in currentQuestion.answers
                    * ADD class "wrong" to the wrong answers and "correct" to the correct ones, and "answers" to all of those buttons (so that we can disable them as soon as we get a valid click)
                <!-- c. disableAnswers()  / this might not be needed if we manage to change question immediately after click-->
                    <!-- * GET all button with "answers" class -->
                    <!-- * SET their "disabled" property to true -->

            2. function validateUserAnswer()
                * LISTEN for 'click' event on questionScreen
                * IF user clicks on a button:
                    * IF that button.innerText is the same as that currentQuestion.correctAnswer
                        * currentScore++
                        <!-- Will need to create a function for the following: -->
                        * UPDATE feedbackText with textContent "Correct!"
                        * APPEND it to questionScreen alongside with horizontalLine (for 1 or 2 seconds)

                    ELSE (if user clicks on any wrong answer buttons)
                        * time -= 10
                        >> Will need to create a function for that:
                        * UPDATE feedbackText with textContent "Wrong!"
                        * APPEND it to questionScreen alongside with horizontalLine

#### STEP 2 - QUIZ IS OVER WHEN TIME === 0 OR NO QUESTIONS AVAILABLE

<!-- Might need to use a switch statement for time -->

    IF time <= 0:
        * ASSIGN `time` the value of 00
        * HIDE the questionScreen and display the endScreen > add a class of "hide" to questionScreen.classList and remove the class of "hide" to endScreen.classList

       ELSE (IF time is still > 0):
            IF there are still questions available in the questions array:
                * THEN REPEAT step 2 with the following question (generate the next question and associated answer)
       ELSE:
            * STOP timer
            * HIDE the questionScreen and display the endScreen
                * ADD a class of "hide" to questionScreen.classList * * REMOVE the class of "hide" to endScreen.classList

### NOW ON DIV #end-screen (need to develop)

    * UPDATE span #final-score textContent to `score`

    IF user clicks on #submit button:

        * PUSH score to a SORTED array of score
            IF array empty
                * just PUSH
            IF array.length > 0
                * PUSH
                * THEN SORT array


        * PUSH initials collected via input #initials (value) to an array of initials
        * CREATE a user object, to link user.initials and user.score

### NOW ON HIGHSCORE PAGE

    * CREATE a li element
    * APPEND it to the ol
    * ADD as textContent a string in the format `${current user.initials} - ${current user.score}$`

    IF user clicks on #clear button,
        * EMPTY highscores arrays/object (+ score arrays, basically all arrays)

## LOCAL STORAGE PART II

    setitem()

END
