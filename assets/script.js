var startQuiz = document.querySelector(".start-quiz");
var quizDicription = document.querySelector(".quiz-dicription");
var questionContainer = document.querySelector(".question-container");

var question = document.querySelector("#question");
var answers = document.querySelector("#answers");

startQuiz.addEventListener("click", function () {
  quizDicription.style.display = "none";
  questionContainer.style.display = "block";
});
