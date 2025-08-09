const quotes = [
  "It is a bit of information that predicts a reward. Our prehistoric ancestors were paying attention to cues that signaled the location of primary rewards like food, water, and sex.",
  "Your mind is continuously analyzing your internal and external environment for hints of where rewards are located.",
  "Cravings are the second step, and they are the motivational force behind every habit.",
  " In theory, any piece of information could trigger a craving, but in practice, people are not motivated by the same cues.",
  "The third step is the response. The response is the actual habit you perform, which can take the form of a thought or an action.",
];

const textToTypeEl = document.querySelector(".text-to-type");
const typingArea = document.querySelector(".typing-area");
const timerEl = document.querySelector(".timer");
const wpmEl = document.querySelector(".wpm");
const errorsEl = document.querySelector(".errors");
const restartBtn = document.querySelector(".restart-btn");

let timer;
let timeElapsed = 0;
let errors = 0;
let currentQuote = "";
let isTimerActive = false;

// دالة لإنشاء اقتباس عشوائي وعرضه
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIndex];

  textToTypeEl.innerHTML = "";
  currentQuote.split("").forEach((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    textToTypeEl.appendChild(span);
  });
}

// دالة لبدء المؤقت
function startTimer() {
  if (!isTimerActive) {
    isTimerActive = true;
    timer = setInterval(() => {
      timeElapsed++;
      timerEl.innerText = timeElapsed;
    }, 1000);
  }
}

// دالة لإعادة ضبط اللعبة
function resetGame() {
  clearInterval(timer);
  timeElapsed = 0;
  errors = 0;
  isTimerActive = false;
  timerEl.innerText = 0;
  wpmEl.innerText = 0;
  errorsEl.innerText = 0;
  typingArea.value = "";
  typingArea.disabled = false;
  getRandomQuote();
}

// دالة لحساب السرعة في الكتابة (WPM)
function calculateWPM() {
  if (timeElapsed === 0) return 0;
  // عدد الكلمات هو عدد المسافات + 1
  const typedWords = typingArea.value.trim().split(" ").length;
  const wpm = Math.round((typedWords / timeElapsed) * 60);
  wpmEl.innerText = wpm;
}

// دالة للتحقق من النص المدخل
function checkInput() {
  startTimer();

  const typedText = typingArea.value;
  const quoteChars = textToTypeEl.querySelectorAll("span");
  let currentErrors = 0;
  let isComplete = true;

  quoteChars.forEach((charSpan, index) => {
    const typedChar = typedText[index];

    if (typedChar === undefined) {
      charSpan.classList.remove("correct", "incorrect");
      isComplete = false;
    } else if (typedChar === charSpan.innerText) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
      currentErrors++;
      isComplete = false;
    }
  });

  errors = currentErrors;
  errorsEl.innerText = errors;

  calculateWPM();

  // عند الانتهاء من الاقتباس بالكامل
  if (isComplete && typedText.length === currentQuote.length) {
    clearInterval(timer);
    isTimerActive = false;
    typingArea.disabled = true;
    alert(
      `Good job! Your WPM is ${wpmEl.innerText} with ${errors} errors. Press Restart to play again.`
    );
  }
}

// الأحداث
getRandomQuote();
typingArea.addEventListener("input", checkInput);
restartBtn.addEventListener("click", resetGame);
