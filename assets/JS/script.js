// Define quiz questions and answers
const quizQuestions = [
    {
       question: "What is the capital of France?",
       options: ["London", "Paris", "Berlin", "Madrid"],
       answer: "Paris"
    },
    {
       question: "What is the tallest mammal in the world?",
       options: ["Elephant", "Giraffe", "Hippopotamus", "Kangaroo"],
       answer: "Giraffe"
    },
    {
       question: "What is the largest planet in our solar system?",
       options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
       answer: "Jupiter"
    }
 ];
 
 // Set quiz timer in seconds
 const quizTimer = 60;
 
 // Define DOM elements
 const startBtn = document.querySelector("#start-btn");
 const quizContainer = document.querySelector("#quiz-container");
 const questionEl = document.querySelector("#question");
 const optionsEl = document.querySelector("#options");
 const nextBtn = document.querySelector("#next-btn");
 const resultContainer = document.querySelector("#result-container");
 const nameInput = document.querySelector("#name");
 const submitBtn = document.querySelector("#submit-btn");
 const scoreEl = document.querySelector("#score");
 const timerEl = document.querySelector("#time");
 const timerTxt = document.querySelector("#timer");
 const highScoresLink = document.querySelector("#high-scores");
 
 let currentQuestionIndex = 0;
 let score = 0;
 let remainingTime = quizTimer;
 let timerInterval;
 
 // Shuffle options array
 function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
    }
 }
 
 // Start quiz function
 function startQuiz(event) {
    event.preventDefault();
    // Hide start button
    startBtn.style.display = "none";
    // Display quiz container
    quizContainer.style.display = "flex";
    //Display Timer
    timerTxt.style.display = "flex";
    // Shuffle options for current question
    shuffleArray(quizQuestions[currentQuestionIndex].options);
    // Display current question and options
    displayQuestion();
    // Start quiz timer
    startTimer();
    console.log("Start Quiz enabled" + event);
 }
 
 // Display current question and options
 function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";
    currentQuestion.options.forEach(option => {
       const optionBtn = document.createElement("button");
       optionBtn.classList.add("option");
       optionBtn.textContent = option;
       optionBtn.addEventListener("click", selectOption);
       optionsEl.appendChild(optionBtn);
    });
 }
 
 // Select option function
 function selectOption(e) {
    const selectedOption = e.target.textContent;
    if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
       // Update score if answer is correct
       score += 10;
       // Store score in Local Storage
       localStorage.setItem("score", score);
    } else {
       // Subtract time if answer is wrong
       remainingTime -= 10;
    }
    // Disable option buttons
    optionsEl.querySelectorAll("button").forEach(btn => {
       btn.disabled = true;
       if (btn.textContent === quizQuestions[currentQuestionIndex].answer) {
          btn.style.backgroundColor = "green";
       } else {
          btn.style.backgroundColor = "red";
       }
    });
    // Display next button
    nextBtn.style.display = "block";
 }

 // Display next question function
function displayNextQuestion() {
    // Increment current question index
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
       // Shuffle options for current question
       shuffleArray(quizQuestions[currentQuestionIndex].options);
       // Display current question and options
       displayQuestion();
    } else {
       // End quiz if all questions have been answered
       endQuiz();
    }
 }
 
 // End quiz function
 function endQuiz() {
    // Stop timer
    clearInterval(timerInterval);
    // Hide quiz container
    quizContainer.style.display = "none";
    // Display result container
    resultContainer.style.display = "block";
    // Display score
    scoreEl.textContent = `Score: ${score}`;
 }
 
 // Start timer function
 function startTimer() {
    timerEl.textContent = remainingTime;
    timerInterval = setInterval(() => {
       remainingTime--;
       timerEl.textContent = remainingTime;
       if (remainingTime <= 0) {
          // End quiz if time is up
          endQuiz();
       }
    }, 1000);
 }
 
 // Submit result function
 function submitResult(e) {
    e.preventDefault();
    const name = nameInput.value;
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = { name, score };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
 }
 
 // Event listeners
 startBtn.addEventListener("click", startQuiz);
 nextBtn.addEventListener("click", displayNextQuestion);
 submitBtn.addEventListener("click", submitResult);
 highScoresLink.addEventListener("click", () => {
    window.location.href = "highscores.html";
 });