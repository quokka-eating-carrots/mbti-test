const main = document.querySelector('#main');
const qna = document.querySelector('#qna');

function addAnswer (answerText, qIdx) {
  const a = document.querySelector('.answerBox');
  const answerBtn = document.createElement('button');
  answerBtn.className = 'answerList'
  a.appendChild(answerBtn);
  answerBtn.innerHTML = answerText;

  answerBtn.addEventListener("click", function () {
    const children = document.querySelectorAll('.answerList');
    for (let i = 0; i < children.length; i += 1) {
      children[i].disabled = true;
      children[i].style.display = 'none';
    }
    goNext(qIdx += 1);
  });
}

function goNext (qIdx) {
  const q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx);
  }
}

function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450);
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}