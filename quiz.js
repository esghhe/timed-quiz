
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoretext = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 
        "What is 2 + 2?",
        choice1: "2",
        choice2: "3", 
        choice3: "4", 
        choice4: "5",  
        answer: "3",
    },
    {
        question: "What is 20 * 11?",
        choice1: "202",
        choice2: "220", 
        choice3: "404", 
        choice4: "210",  
        answer: "2",
    },
    {
        question: 'What does HTML stands for?',
        choice1: 'Hypertext Markup Language',
        choice2: 'hypertext medium lnguage', 
        choice3: 'Hellotext Markup Language', 
        choice4: 'Hypertext Markup laser',  
        answer: '1'
    },
    {
        question: 'Which of the following is not a number ?',
        choice1: '2',
        choice2: '3', 
        choice3: 'A', 
        choice4: '5',  
        answer: '3'
    }
]

const SCORE_POINTS = 25
const MAX_QUESTIONS = 4

startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
    selectedChoice.parentElement.classList.add(classToApply)
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
    }, 1000) 
    })
})
incrementScore = num => {
    score +=num
    scoretext.innerText = score 
}
startQuiz()
