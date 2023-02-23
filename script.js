var quizData = [
  {
    question: "What does HTML stand for?",
    a: "Hyperlinks and Text Markup Language",
    b: "Hyper Text Markup Language",
    c: "Home Tool Markup Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "b",
  },

  {
    question:
      "Where does the content of the page (such as your pictures, text, links) show up?",
    a: "Head",
    b: "Style",
    c: "Body",
    d: "Header",
    correct: "c",
  },

  {
    question: "What does CSS stand for?",
    a: "Cascading Style Sheets",
    b: "Creative Style Sheets",
    c: "Colorful Style Sheets",
    d: "Computer Style Sheets",
    correct: "a",
  },

  {
    question: "Which property is used to change the background colour?",
    a: "bgcolor",
    b: "background-colour",
    c: "bcolor",
    d: "background-color",
    correct: "d",
  },

  {
    question: "Which event occurs when the user clicks on an HTML element?",
    a: "onclick",
    b: "onmouseover",
    c: "onchange",
    d: "onmouseclick",
    correct: "a",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const timerEl = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerId;

function startTimer() {
  timerId = setInterval(() => {
    timerEl.textContent = "Time left: " + timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerId);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerId);
  quiz.innerHTML = `
    <h2>Quiz Completed!</h2>
    <h3>Your score is ${score}/${quizData.length}.</h3>
    <label for="initials">Enter your initials:</label>
    <input type="text" id="initials">
    <button id="save-score">Save Score</button>
  `;
  const saveScoreBtn = document.getElementById("save-score");
  saveScoreBtn.addEventListener("click", saveScore);
}

function saveScore() {
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value;
  if (initials !== "") {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("highscores.html");
  }
}

function loadQuiz() {
  questionEl.innerText = quizData[currentQuestion].question;
  a_text.innerText = quizData[currentQuestion].a;
  b_text.innerText = quizData[currentQuestion].b;
  c_text.innerText = quizData[currentQuestion].c;
  d_text.innerText = quizData[currentQuestion].d;
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

loadQuiz();
startTimer();

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
      timeLeft += 5;
    } else {
      timeLeft -= 5;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      endQuiz();
    }
    deselectAnswers();
  }
});
