let allData = {};
let questions = [];
let current = 0;

fetch("data/questions.json")
  .then(res => res.json())
  .then(data => {
    allData = data.categories;
    loadCategories();
  });

function loadCategories() {
  const categorySelect = document.getElementById("categorySelect");
  Object.keys(allData).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

function startQuiz() {
  const category = document.getElementById("categorySelect").value;
  const difficulty = document.getElementById("difficultySelect").value;

  questions = allData[category][difficulty] || [];

  if (questions.length === 0) {
    alert("No questions available for this selection.");
    return;
  }

  current = 0;
  document.getElementById("setup").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = questions[current];
  if (selected === q.answer) {
    alert("Correct!\n" + q.verse);
  } else {
    alert("Wrong!\nCorrect answer: " + q.options[q.answer]);
  }
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    alert("Quiz Completed!");
    location.reload();
  }
}