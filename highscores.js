const highscoreList = document.querySelector('#highScoreList')
const highScores = JSON.parse(localStorage('#highScore')) || []

highscoreList.innerHTML =
highScores.map(score => {
    return <li class="high-score">${score.name} - ${score.score}</li>  
}).join('')