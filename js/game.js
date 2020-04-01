const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
//console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// questions array
let questions = [
    {
      question: "Inside which HTML element do we put the JavaScript??",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1
    },
    {
      question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
    },
    {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
    }
  ];


// constants 

const correct_bonus = 10;
const max_questions =3;

//functions 
function startGame(){
    questionCounter = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

function getNewQuestion(){
    if(availableQuestions === 0 || questionCounter >= max_questions){
        //conditional to go to finalscore page
        return window.location.assign('/end.html');
    }
    //update question 
    questionCounter++;

    //question text display on hud 
    questionCounterText.innerText = `${questionCounter} / ${max_questions}`

    //Random Question generator
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    //remove question for array of available quetions
    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true;
};
// choices loop that listens for clicks to choice of player then applys class
choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        console.log(e.target);

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        //apply class
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct'){
            incrementScore(correct_bonus);
        }

        //added new class selected choices
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
          }, 1000);


        console.log(selectedAnswer == currentQuestion.answer);
    });

});

function incrementScore(num){
    score += num;
    scoreText.innerText = score; 
}


//same as startGame = () =>{}
startGame();