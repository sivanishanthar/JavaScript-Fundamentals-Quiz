// DOM elements
const startButton = document.querySelector('#start-quiz');
const quizDescription = document.querySelector('.quiz-dicription');

const quizCard = document.querySelector('.quiz-card');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.btn-option');
const answerCheckElement = document.querySelector('.answer-check');

const timerElement = document.getElementById('timer');
const timeLeftElement = document.getElementById('timeLeft');

const viewScoreElement = document.getElementById('highScore');

const scoreCard = document.querySelector('.score-card');
const finalScoreElement = document.getElementById('finalScore');
const initialsInput = document.getElementById('initials');
const submitButton = document.getElementById('initialSubmit');

const scoreListSection = document.querySelector('.score-list-section');
const scoreList = document.querySelector('.score-list');
const goBackButton = document.getElementById('goBack');
const clearHighScoresButton = document.getElementById('clearHighscores');


const questionList = [
{
    questionText: "Which of the following is correct about JavaScript?",
    options: [
      "A. Object-Based language",
      "B. Assembly-language",
      "C. Object-Oriented language",
      "D. High-level language",
      ],
      correctAnswer: "A. Object-Based language",
},
{
    questionText: "Which of the following object is the main entery point to all client-side JavaScript features and APIs?",
    options: [
    "A. Position", 
    "B. Window", 
    "C. Standard", 
    "D. Location"
    ],
    correctAnswer: "B. Window",
},
{
    questionText: "Which of the following is not JavaScript data type?",
    options: [
      "A. Null type",
      "B. Undefined type",
      "C. Number type",
      "D. All of the mentioned",
    ],
    correctAnswer: "D. All of the mentioned",
},
{
    questionText: "Which of the following can be used to call a JavaScript Code Snippet?",
    options: [
      "A. Function/Method",
      "B. Preprocessor",
      "C. Triggering Event",
      "D. RMI",
    ],
    correctAnswer: "A. Function/Method",
},
{
    questionText: "Why event handlers is needed in JavaScript?",
    options: [
      "A. Adds inner HTML page to the code",
      "B. Change the server location",
      "C. Allows JavaScript code to alter the behaviours of windows",
      "D. Performs handling of exceptions and occurrences",
    ],
    correctAnswer: "C. Allows JavaScript code to alter the behaviours of windows",
},
];

let shuffledQuestions;
let currentQuestionIndex;
let score = 0;
let timer;
let timerInterval;

// Function to start the quiz
function startQuiz() {
    quizDescription.style.display = 'none';
    quizCard.style.display = 'block';

    // Shuffles the array of questions (stored in questionList) randomly.
    // shuffledQuestions = questionList.sort(() => Math.random() - 0.5);

    shuffledQuestions = questionList;
    currentQuestionIndex = 0; // Set the index of current question to 0, indicating the start of the quiz
    score = 0;
    timer = 60; 
    timeLeftElement.textContent = timer;
    finalScoreElement.textContent = score;
    setNextQuestion();
    startTimer();
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timeLeftElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            timeLeftElement.textContent = "Time's up";
            endQuiz();
        } else {
            timeLeftElement.textContent = timer;
        }
    }, 1000);
}
// Function to set the next question
function setNextQuestion() {
    console.log('Setting next question');
    // resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

// Function to show a question
function showQuestion(question) {
    questionElement.textContent = question.questionText;
    const answerButtons = [
        document.getElementById('optionA'), 
        document.getElementById('optionB'), 
        document.getElementById('optionC'), 
        document.getElementById('optionD')
    ];
    question.options.forEach((option, index) => {
        answerButtons[index].firstElementChild.textContent = option;
        answerButtons[index].firstElementChild.onclick = () => selectAnswer(option === question.correctAnswer);
    });
}

// Function to select an answer
function selectAnswer(isCorrect) {
    if (isCorrect) {
        score++;
        finalScoreElement.textContent = score;
        answerCheckElement.textContent = 'Correct!';
        answerCheckElement.style.color =  '#008000';

    } else {
        timer -= 10; // Subtract time for incorrent answer
        answerCheckElement.textContent = 'Wrong!';
        answerCheckElement.style.color =  '#ff0000';
    }

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        clearInterval(timerInterval);
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    quizCard.style.display = 'none';
    scoreCard.style.display = 'block';
    finalScoreElement.textContent = score;
}

function viewHighScore(event) {
    event.preventDefault();
    quizDescription.style.display = 'none';
    quizCard.style.display = 'none';
    scoreCard.style.display = 'none';
    timerElement.style.display = 'none';
    

    // Retrieve high scores from local storage
    var retrievedHighScores = localStorage.getItem("quizHighScores");
    var storedHighScores = retrievedHighScores ? JSON.parse(retrievedHighScores) : [];


    // Clear existing scores displayed
    scoreList.innerHTML = '';

    // Display all high scores
    for (var i = 0; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.textContent = `${storedHighScores[i].initials}: ${storedHighScores[i].score}`;
        scoreList.appendChild(eachNewHighScore);
    }
    // Show the high scores section
    scoreListSection.style.display = 'block';
}
function submitScore(event) {
    event.preventDefault(); 
    if (initialsInput.value === "") {
        alert("Please enter your initials before submitting!");
        return;
    } 
    // Retrieve the current list of high scores from local storage
    var savedHighScores = localStorage.getItem("quizHighScores");
    var highScoresList = savedHighScores ? JSON.parse(savedHighScores) : [];

    // Add the new score to the high scores list
    highScoresList.push({ initials: initialsInput.value, score: score });

    // Save the updated high scores list to local storage
    localStorage.setItem("quizHighScores", JSON.stringify(highScoresList));

    // Hide the input field and submit button
    initialsInput.style.display = 'none';
    submitButton.style.display = 'none';

    // View high scores after submitting
    viewHighScore(new Event('click'));
}

goBackButton.addEventListener("click", function() {
    quizDescription.style.display = "block";
    scoreListSection.style.display = "none";
});

clearHighScoresButton.addEventListener("click", function(){
    window.localStorage.removeItem("quizHighScores");

    // Clear the current content of scoreList
    scoreList.innerHTML = "";

    var clearedMessage = document.createElement("p");
    clearedMessage.innerHTML = "Scores are cleared!";
    clearedMessage.style.color = "#563d7c";

    // Append the new paragraph to scoreList
    scoreList.appendChild(clearedMessage);
});

viewScoreElement.addEventListener('click', viewHighScore);
startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', submitScore);
