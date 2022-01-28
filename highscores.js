const highscoreList = document.querySelector('#highScoreList')
const highScores = JSON.parse(localStorage.getItem('#highScore')) || []

highscoreList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>` 
}).join('')