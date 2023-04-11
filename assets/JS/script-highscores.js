// Define DOM elements
const highScoresList = document.querySelector("#high-scores-list");
 
// Retrieve highscores from Local Storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Display highscores in list
highScores.forEach((score, index) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${index + 1}. ${score.name}: ${score.score}`;
    highScoresList.appendChild(scoreItem);
});
  