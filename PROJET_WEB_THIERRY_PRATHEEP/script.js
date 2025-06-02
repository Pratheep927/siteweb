const quizQuestions = [
    {
        question: "Quel pourcentage du territoire français est couvert par des forêts ?",
        options: ["10%", "20%", "31%", "45%"],
        answer: 2,
        type: "single"
    },
    {
        question: "Parmi ces menaces, lesquelles pèsent sur la biodiversité terrestre ?",
        options: ["La déforestation", "La pollution des sols", "La fragmentation des habitats", "Le réchauffement des océans"],
        answer: [0, 1, 2],
        type: "multiple"
    },
    {
        question: "Quel pourcentage des espèces évaluées en France sont menacées d'extinction ?",
        options: ["5%", "15%", "26%", "40%"],
        answer: 2,
        type: "single"
    },
    {
        question: "Quelle est la cible principale de l'ODD 15.2 ?",
        options: ["Protéger les écosystèmes marins", "Lutter contre la déforestation", "Réduire la pollution de l'air", "Promouvoir l'agriculture intensive"],
        answer: 1,
        type: "single"
    },
    {
        question: "Quelles actions peuvent contribuer à la protection de la vie terrestre ?",
        options: ["Consommer des produits locaux et biologiques", "Utiliser plus de papier", "Planter des arbres", "Informer sur les enjeux de la biodiversité"],
        answer: [0, 2, 3],
        type: "multiple"
    },
    {
        question: "Quel réseau européen protège les espèces et les habitats en France ?",
        options: ["Réseau Écologique", "Natura 2000", "Biosphère Plus", "EcoProtect"],
        answer: 1,
        type: "single"
    },
    {
        question: "Combien d'espèces sont menacées d'extinction dans le monde selon le site ?",
        options: ["Environ 100 000", "Plus de 500 000", "Plus de 1 million", "Environ 2,5 millions"],
        answer: 2,
        type: "single"
    },
    {
        question: "Parmi ces problèmes, lesquels sont mentionnés comme des menaces pour la biodiversité ?",
        options: ["Les espèces invasives", "La surpêche", "Les marées noires", "La fragmentation des habitats"],
        answer: [0, 3],
        type: "multiple"
    },
    {
        question: "Quel pourcentage du territoire français est protégé grâce à Natura 2000 ?",
        options: ["5,4%", "8,7%", "12,9%", "17,2%"],
        answer: 2,
        type: "single"
    },
    {
        question: "Quelles solutions sont mises en œuvre pour protéger la biodiversité ?",
        options: ["Le reboisement", "Les réserves naturelles", "L'agriculture intensive", "La surveillance contre le braconnage"],
        answer: [0, 1, 3],
        type: "multiple"
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = Array(quizQuestions.length).fill(null);

function initQuiz() {
    const quizSection = document.createElement('section');
    quizSection.id = 'quiz-container';
    
    const consignesQuiz = document.querySelector('.Consigne');
    consignesQuiz.after(quizSection);
    
    const questionContainer = document.createElement('div');
    questionContainer.id = 'question-container';
    quizSection.appendChild(questionContainer);
    
    const navigationContainer = document.createElement('div');
    navigationContainer.id = 'navigation-buttons';
    navigationContainer.innerHTML = `
        <button id="prev-btn" onclick="prevQuestion()">Question précédente</button>
        <button id="next-btn" onclick="nextQuestion()">Question suivante</button>
    `;
    quizSection.appendChild(navigationContainer);
    
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results-container';
    resultsContainer.style.display = 'none';
    quizSection.appendChild(resultsContainer);
    
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionContainer = document.getElementById('question-container');
    
    let optionsHTML = '';
    if (question.type === 'single') {
        for (let i = 0; i < question.options.length; i++) {
            const checked = userAnswers[currentQuestion] === i ? 'checked' : '';
            optionsHTML += `
                <div class="option">
                    <input type="radio" name="q${currentQuestion}" id="q${currentQuestion}o${i}" value="${i}" ${checked} onchange="updateAnswer(${i})">
                    <label for="q${currentQuestion}o${i}">${question.options[i]}</label>
                </div>
            `;
        }
    } else {
        for (let i = 0; i < question.options.length; i++) {
            const isChecked = userAnswers[currentQuestion] && 
                              Array.isArray(userAnswers[currentQuestion]) && 
                              userAnswers[currentQuestion].includes(i);
            const checked = isChecked ? 'checked' : '';
            optionsHTML += `
                <div class="option">
                    <input type="checkbox" name="q${currentQuestion}o${i}" id="q${currentQuestion}o${i}" value="${i}" ${checked} onchange="updateMultipleAnswer(${i})">
                    <label for="q${currentQuestion}o${i}">${question.options[i]}</label>
                </div>
            `;
        }
    }
    
    questionContainer.innerHTML = `
        <div class="question-number">Question ${currentQuestion + 1} sur ${quizQuestions.length}</div>
        <div class="question-type">${question.type === 'multiple' ? '(Plusieurs réponses possibles)' : '(Une seule réponse possible)'}</div>
        <h3>${question.question}</h3>
        <div class="options">
            ${optionsHTML}
        </div>
    `;
    
    updateNavigationButtons();
}

function updateAnswer(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
}

function updateMultipleAnswer(optionIndex) {
    if (!userAnswers[currentQuestion] || !Array.isArray(userAnswers[currentQuestion])) {
        userAnswers[currentQuestion] = [];
    }
    
    const index = userAnswers[currentQuestion].indexOf(optionIndex);
    if (index !== -1) {
        userAnswers[currentQuestion].splice(index, 1);
    } else {
        userAnswers[currentQuestion].push(optionIndex);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion === quizQuestions.length - 1) {
        calculateResults();
        return;
    }
    currentQuestion++;
    showQuestion();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Voir les résultats' : 'Question suivante';
}

function calculateResults() {
    score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        const question = quizQuestions[i];
        const userAnswer = userAnswers[i];
        
        if (question.type === 'single') {
            if (userAnswer === question.answer) {
                score++;
            }
        } else {
            if (userAnswer && Array.isArray(userAnswer) && Array.isArray(question.answer)) {
                const isCorrect = 
                    userAnswer.length === question.answer.length && 
                    userAnswer.every(value => question.answer.includes(value));
                if (isCorrect) {
                    score++;
                }
            }
        }
    }
    
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('navigation-buttons').style.display = 'none';
    
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = 'block';
    
    let message = '';
    if (score <= 3) {
        message = "Il y a encore beaucoup à apprendre sur la biodiversité et la vie terrestre.";
    } else if (score <= 6) {
        message = "Vous avez de bonnes connaissances de base sur la vie terrestre.";
    } else if (score <= 9) {
        message = "Très bien ! Vous êtes bien informé(e) sur les enjeux de biodiversité.";
    } else {
        message = "Excellent ! Vous maîtrisez parfaitement le sujet de la vie terrestre.";
    }
    
    resultsContainer.innerHTML = `
        <h2>Résultats du Quiz</h2>
        <p class="score">Votre score : ${score} / ${quizQuestions.length}</p>
        <p class="message">${message}</p>
        <button onclick="restartQuiz()">Recommencer le quiz</button>
        <button onclick="showAnswers()">Voir les réponses</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = Array(quizQuestions.length).fill(null);
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('navigation-buttons').style.display = 'block';
    showQuestion();
}

function showAnswers() {
    const resultsContainer = document.getElementById('results-container');
    let answersHTML = '<h3>Réponses correctes</h3>';
    
    for (let i = 0; i < quizQuestions.length; i++) {
        const question = quizQuestions[i];
        answersHTML += `<p><strong>Question ${i + 1}:</strong> ${question.question}</p>`;
        
        if (question.type === 'single') {
            answersHTML += `<p>Réponse correcte: ${question.options[question.answer]}</p>`;
        } else {
            answersHTML += '<p>Réponses correctes: ';
            const correctOptions = question.answer.map(index => question.options[index]);
            answersHTML += correctOptions.join(', ');
            answersHTML += '</p>';
        }
        answersHTML += '<hr>';
    }
    
    answersHTML += '<button onclick="restartQuiz()">Recommencer le quiz</button>';
    resultsContainer.innerHTML = answersHTML;
}

window.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.titre_quiz')) {
        initQuiz();
    }
});
