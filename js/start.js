const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');

const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


function addAnswer (answerText, qIdx, idx) {
  const a = document.querySelector('.answerBox');
  const answerBtn = document.createElement('button');
  answerBtn.className = 'answerList'
  answerBtn.className += ' my-3 py-3 mx-auto'
  answerBtn.className += ' fadeIn'
  a.appendChild(answerBtn);
  answerBtn.innerHTML = answerText;

  answerBtn.addEventListener("click", function () {
    const children = document.querySelectorAll('.answerList');
    for (let i = 0; i < children.length; i += 1) {
      children[i].disabled = true;
      children[i].className += ' fadeOut';
    }
    setTimeout(() => {
      const target = qnaList[qIdx].a[idx].type;
      for (let i = 0; i < target.length; i += 1) {
        select[target[i]] += 1;
      }
      for (let i = 0; i < children.length; i += 1) {
        children[i].style.display = 'none';
      }
      goNext(qIdx += 1);
    }, 450)
  });
}

function calcResult () {
  const result = select.indexOf(Math.max(...select));
  return result;
  // let pointArray = [
  //   { name: 'mouse', value: 0, key: 0 },
  //   { name: 'cow', value: 0, key: 1 },
  //   { name: 'tiger', value: 0, key: 2 },
  //   { name: 'rabbit', value: 0, key: 3 },
  //   { name: 'dragon', value: 0, key: 4 },
  //   { name: 'snake', value: 0, key: 5 },
  //   { name: 'horse', value: 0, key: 6 },
  //   { name: 'sheep', value: 0, key: 7 },
  //   { name: 'monkey', value: 0, key: 8 },
  //   { name: 'chick', value: 0, key: 9 },
  //   { name: 'dog', value: 0, key: 10 },
  //   { name: 'pig', value: 0, key: 11 }
  // ]

  // for (let i = 0; i < endPoint; i += 1) {
  //   const target = qnaList[i].a[select[i]];
  //   for (let j = 0; j < target.type.length; j += 1) {
  //     for (let k = 0; k < pointArray.length; k += 1) {
  //       if (target.type[j] === pointArray[k].name) {
  //         pointArray[k].value += 1;
  //       }
  //     }
  //   }
  // }

  // let resultArray = pointArray.sort(function (a, b) {
  //   if (a.value > b.value) {
  //     return -1;
  //   } if (a.value < b.value) {
  //     return 1;
  //   }
  //     return 0;
  // });

  // let resultword = resultArray[0].key;
  // return resultword;
}

function setResult () {
  let point = calcResult();
  const resultName = document.querySelector('.resultName');
  resultName.innerHTML = infoList[point].name;

  const resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  let imgURL = `https://raw.githubusercontent.com/nani6765/MyMBTI/main/%235.%20Img%20Version/img/image-${point}.png`
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.className += ' img-fluid'
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult () {
  // qna.style.WebkitAnimation = "fadeOut 1s";
  // qna.style.animation = "fadeOut 1s";
  qna.className += ' fadeOut-1'
  setTimeout(() => {
    // result.style.WebkitAnimation = "fadeIn 1s";
    // result.style.animation = "fadeIn 1s";
    result.className += ' fadeIn-1'
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450);
  }, 450);

  setResult();
  calcResult();
}

function goNext (qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }

  const q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  const status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx + 1) + '%';
};

function begin() {
  // main.style.WebkitAnimation = "fadeOut 1s";
  // main.style.animation = "fadeOut 1s";
  main.className += ' fadeOut-1';
  setTimeout(() => {
    // qna.style.WebkitAnimation = "fadeIn 1s";
    // qna.style.animation = "fadeIn 1s";
    qna.className += 'fadeIn-1';
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450);
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}