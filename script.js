// ===============================
// BIRTHDAY WEBSITE TEMPLATE
// عدّل البيانات بين الأقواس فقط.
// ===============================

const CONFIG = {
  // مثال العميل الحالي: 12/04/2006 → العيد القادم 12/04/2027
  birthdayDate: "2027-04-12T00:00:00",
  // لو عايز الموقع يحسب السنة القادمة تلقائيًا من تاريخ الميلاد:
  // غيّر birthdayDate يدويًا لكل عميل أو استخدم الدالة الموجودة بالأسفل.
};

const $ = (id) => document.getElementById(id);

function updateCountdown() {
  const target = new Date(CONFIG.birthdayDate).getTime();
  const now = Date.now();
  let diff = target - now;

  if (diff <= 0) {
    // إذا وصل يوم الميلاد، اعرض 00 مؤقتًا ثم حدّث التاريخ للسنة التالية.
    const d = new Date(CONFIG.birthdayDate);
    d.setFullYear(d.getFullYear() + 1);
    CONFIG.birthdayDate = d.toISOString();
    diff = new Date(CONFIG.birthdayDate).getTime() - now;
  }

  const day = 86400000, hour = 3600000, minute = 60000;
  const days = Math.floor(diff / day);
  const hours = Math.floor((diff % day) / hour);
  const minutes = Math.floor((diff % hour) / minute);
  const seconds = Math.floor((diff % minute) / 1000);

  $("days").textContent = String(days).padStart(2, "0");
  $("hours").textContent = String(hours).padStart(2, "0");
  $("minutes").textContent = String(minutes).padStart(2, "0");
  $("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

$("startBtn").addEventListener("click", () => {
  document.querySelector("#story").scrollIntoView({ behavior: "smooth" });
});

$("envelope").addEventListener("click", () => {
  $("envelope").classList.toggle("open");
  $("letterContent").classList.toggle("show");
});

const questions = [
  {
    q: "مين قال أول \"بحبك\"؟",
    answers: ["(اسمه)", "(اسمها)", "(الاتنين مع بعض)", "(لسه محدش قالها)"],
    correct: 0
  },
  {
    q: "إيه أكتر حاجة مميزة فيها؟",
    answers: ["ضحكتها", "طيبتها", "كل حاجة فيها", "(إجابة خاصة)"],
    correct: 2
  }
];
let currentQuestion = 0;

function renderQuestion() {
  const item = questions[currentQuestion];
  $("question").textContent = item.q;
  $("answers").innerHTML = item.answers.map((answer, i) =>
    `<button class="answer" data-index="${i}">${answer}</button>`
  ).join("");
}
renderQuestion();

$("answers").addEventListener("click", (e) => {
  const btn = e.target.closest(".answer");
  if (!btn) return;
  const item = questions[currentQuestion];
  const correct = Number(btn.dataset.index) === item.correct;
  $("quizResult").textContent = correct
    ? "صح! واضح إنك عارفة التفاصيل ❤️"
    : "غلط 😏 بس هنعديهالك المرة دي.";

  setTimeout(() => {
    currentQuestion = (currentQuestion + 1) % questions.length;
    renderQuestion();
  }, 1200);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const hearts = document.querySelector(".hearts");
setInterval(() => {
  const heart = document.createElement("span");
  heart.textContent = Math.random() > .5 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (10 + Math.random() * 16) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}, 900);

// زر الموسيقى جاهز. أضف ملف assets/music.mp3 ثم فعّل السطرين بالأسفل إذا أردت.
let audio = null;
$("musicBtn").addEventListener("click", () => {
  if (!audio) {
    audio = new Audio("assets/music.mp3");
    audio.loop = true;
  }
  if (audio.paused) {
    audio.play().catch(() => {});
    $("musicBtn").textContent = "Ⅱ";
  } else {
    audio.pause();
    $("musicBtn").textContent = "♫";
  }
});
