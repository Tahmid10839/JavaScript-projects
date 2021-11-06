
const quizData = [
    {
        question: 'How old is Tahmid?',
        a: '12',
        b: '20',
        c: '23',
        d: '90',
        correct: 'c'
    },
    {
        question: 'What is the most used Programming Language?',
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'JavaScript',
        correct: 'd'
    },
    {
        question: 'Who is the Prime Minister of Bangladesh?',
        a: 'Donald Trump',
        b: 'Sheikh Hasina',
        c: 'Khaleda Zia',
        d: 'Abul Kalam Azad',
        correct: 'b'
    },
    {
        question: 'What does HTML stands for?',
        a: 'HyperText Markup Language',
        b: 'Cascading Style Sheet',
        c: 'Javascript Object Notation',
        d: 'Helicopters Terminals Motorboats Lamborghinis',
        correct: 'a'
    },
    {
        question: 'What year was JavaScript Launched?',
        a: '1990',
        b: '1995',
        c: '1996',
        d: 'None of the Above',
        correct: 'b'
    }
];

const questionEl = document.getElementById('question');

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');

const answers = document.querySelectorAll('.answer');
const quiz = document.getElementById('quiz');
let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    questionEl.innerText = quizData[currentQuiz].question;

    a_text.innerText = quizData[currentQuiz].a;
    b_text.innerText = quizData[currentQuiz].b;
    c_text.innerText = quizData[currentQuiz].c;
    d_text.innerText = quizData[currentQuiz].d;
}

const submit = document.getElementById('submit');

submit.addEventListener('click', () => {
    const ans = getSelected();
    if (ans != undefined) {
        if (ans === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            deSelectAnswers();
            loadQuiz();
        }
        else {
            quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                              <button onclick="location.reload()">Reload</button>  
                            `;
        }
    }
});

function getSelected() {
    let an = undefined;
    answers.forEach((answer) => {
        if (answer.checked) {
            // console.log(answer.id);
            an = answer.id;
        }
    });
    return an;
}

function deSelectAnswers(){
    answers.forEach((ans)=>{
        ans.checked = false;
    });
}