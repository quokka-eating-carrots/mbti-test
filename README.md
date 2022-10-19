# mbti-test

[참고 강의](https://edu.goorm.io/lecture/25652/하루-10분-web-project-html-js-css로-나만의-mbti-사이트-만들기)<br>
[완성 페이지]()

---
`221018`

해당 프로젝트는[BootStrap](http://getbootstrap.com)을 사용하여서 제작하였습니다. `BootStrap`은 반응형 웹사이트를 만들기 위한 라이브러리라고 할 수 있습니다.

class에 `col-lg-6 col-md-8 col-sm-10`을 사용하면 화면 비율이 `column` 즉 가로로 작아지거나 커졌을 때 콘텐츠의 비율을 정할 수 있습니다. lg = large, md = medium, sm = small의 이미이고, 6, 8, 10은 비율입니다.

`button` 태그에서 `onclick` 이라는 속성을 사용하면 클릭이 되었을 때 어떤 반응을 해야 할지 설정할 수 있습니다.
```html
<button type="button" onclick="js:begin()">시작하기</button>
```
`button`을 누르게 되면 `begin`이라는 함수가 실행되게끔 설정해 줍니다.
```javascript
function begin() {
  main.style.display = "none";
  qna.style.display = "block";
}
```

이렇게 하면 자연스러운 전환이 아니기 때문에 animation을 넣어 줍니다.
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@-webkit-keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@-webkit-keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

```javascript
function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450)
  }, 450)
}
```

fade 효과가 1초 안에 이루어지기 때문에 `display`를 껐다가 켜는 것을 450밀리초를 주어서 자연스럽게 설정해 줍니다.

---
`221019`

`<section>` 안에 class명이 `qBox`와 `answerBox`인 `<div>`를 작성합니다.

`data.js`에서 질문과 답변 array를 가지고 오는 js를 작성합니다.
```javascript
// 질문을 가지고 오는 함수
function goNext (qIdx) {
  const q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
}
```

```javascript
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
```

시작하는 함수에도 화면이 전환될 때 질문이 나와야 함으로 `goNext`함수를 실행시켜 줍니다. 처음 시작은 0으로 시작하고 다음 페이지로 넘어갈 때 + 1 이 되게 함수를 작성해 주면 됩니다. 현재는 첫 번째 페이지 기준이기 때문에 + 1 함수가 없습니다.

```javascript
function addAnswer (answerText) {
  const a = document.querySelector('.answerBox');
  const answerBtn = document.createElement('button');
  a.appendChild(answerBtn);
  answerBtn.innerHTML = answerText;
}

function goNext (qIdx) {
  const q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer);
  }
}
```

질문을 가지고 오는 함수도 작성해 줍니다. `goNext`함수에 반복문을 작성하여 qnaList에 있는 a 배열에서 answer가 개수만큼 반복되게 코드를 작성합니다.

```javascript
function addAnswer (answerText) {
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
  }, false);
}
```

[완성 예제 사이트](https://twelvelovetype.netlify.app/)를 확인해 보면 답변을 클릭 후 모든 답변지가 사라진 후에 다음 페이지로 넘어가는 것을 볼 수 있습니다. 그것을 구현하기 위하여 `answerBtn`에 class 이름을 추가하여 주었고, `addEventListener`을 통해서 click을 하였을 때 답변들이 사라지게 하는 코드를 작성합니다.

```javascript
function addAnswer (answerText, qIdx) { // qIdx 추가됨!!
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
    goNext(qIdx += 1); // qIdx에 +1
  });
}

function goNext (qIdx) {
  const q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx); //qIdx 추가됨!
  }
}
```
그런 후 다음 페이지로 넘어갈 수 있게 `qIdx` 인수들을 추가해 주고, 버튼을 눌렀을 때 `goNext`에서 + 1 된 값이 실행이 되게 추가해 줍니다.

```javascript
function addAnswer (answerText, qIdx) {
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
      for (let i = 0; i < children.length; i += 1) {
        children[i].style.display = 'none';
      }
      goNext(qIdx += 1);
    }, 450)
  });
}
```

메인 페이지 UI와 비슷하게 qna 부분에도 css를 설정해 줍니다. `answer` 버튼은 JS에서 생성해 줬기 때문에 class 명도 JS에서 작성해 주었습니다. 화면 전환이 부드럽게 되기 위해서 `addEventListener` 부분에도 `fadeOut`을 설정해 줍니다. 강의에서 `animation.css`에 `fadeOut`도 설정값을 두고 사용하지 않아서 저는 class 명으로 `fadeOut`을 설정해 주었습니다. 강의보다 코드는 줄었고, 실행은 똑같이 되었습니다.

```css
.status {
  height: 10px;
  width: 80%;
  background-color: whitesmoke;
  border-radius: 20px;
}

.statusBar {
  height: 100%;
  border-radius: 20px;
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#c4b5db+0,b2a3c9+100 */
  background: #c4b5db; /* Old browsers */
  background: -moz-linear-gradient(left,  #c4b5db 0%, #b2a3c9 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(left,  #c4b5db 0%,#b2a3c9 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right,  #c4b5db 0%,#b2a3c9 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c4b5db', endColorstr='#b2a3c9',GradientType=1 ); /* IE6-9 */
}
```
```javascript
const endPoint = 12;

function goNext (qIdx) {
  const q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx);
  }
  const status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx + 1) + '%';
};
```

질문 위에 진행바를 나타내 보았습니다. 총 질문이 12개기 때문에 `endPoint`로 12 값을 주었고, `goNext` 함수 안에 진행바가 채워질 수 있게 연산을 작성해 줍니다. [그라데이션](https://www.colorzilla.com/gradient-editor/)은 해당 사이트에서 작성하였습니다.

```javascript
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
}
```
`goResult` 함수를 생성하여 시작 페이지에서 qna로 넘어갈 때와 똑같이 작성해 줍니다. 주석처리 된 부분은 class를 추가하는 것으로 변경하였기 때문에 참고를 위해 두었습니다. `begin` 함수도 똑같이 수정해 두었습니다.

```javascript
const select = [];

function addAnswer (answerText, qIdx, idx) { // idx 인수 추가
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
      select[qIdx] = idx; // select 변수 안에 qIdx에서 몇 번째 idx를 선택했는지 알기 위한 코드
      for (let i = 0; i < children.length; i += 1) {
        children[i].style.display = 'none';
      }
      goNext(qIdx += 1);
    }, 450)
  });
}

function goNext (qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }

  const q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i); // i 인수 추가
  }
  const status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx + 1) + '%';
};
```

주석에 적어 두었듯 몇 번째 답변을 골랐는지 확인하기 위한 배열 변수를 생성해 준 뒤, 질문을 선택하는 곳에서 몇 번째 index인지 인수로 받아서 배열로 저장해 줍니다.

```javascript
function calcResult () {
  let pointArray = [
    { name: 'mouse', value: 0, key: 0 },
    { name: 'cow', value: 0, key: 1 },
    { name: 'tiger', value: 0, key: 2 },
    { name: 'rabbit', value: 0, key: 3 },
    { name: 'dragon', value: 0, key: 4 },
    { name: 'snake', value: 0, key: 5 },
    { name: 'horse', value: 0, key: 6 },
    { name: 'sheep', value: 0, key: 7 },
    { name: 'monkey', value: 0, key: 8 },
    { name: 'chick', value: 0, key: 9 },
    { name: 'dog', value: 0, key: 10 },
    { name: 'pig', value: 0, key: 11 }
  ]

  for (let i = 0; i < endPoint; i += 1) {
    const target = qnaList[i].a[select[i]];
    for (let j = 0; j < target.type.length; j += 1) {
      for (let k = 0; k < pointArray.length; k += 1) {
        if (target.type[j] === pointArray[k].name) {
          pointArray[k].value += 1;
        }
      }
    }
  }

  let resultArray = pointArray.sort(function (a, b) {
    if (a.value > b.value) {
      return -1;
    } if (a.value < b.value) {
      return 1;
    }
      return 0;
  });

  let resultword = resultArray[0].key;
  return resultword;
}
```

사용자가 선택한 답변에 따른 결과값을 계산하는 알고리즘 코드를 작성해야 합니다. 답변으로 나오는 동물은 총 12개이므로 key 값을 0 ~ 11까지 주어 배열을 작성합니다. 그리고 사용자가 답변을 고르는 동안 for문을 통해서 어떤 값이 제일 높은지 재배열을 해 주어야 합니다. `target`은 `qnaList`의 [i]번째 질문 안에 [i]번째 답변을 골랐는지 알 수 있게 해 주는 변수이고, `data.js`를 보면 답변 뒤에 어떤 type인지 확인할 수 있습니다. 사용자가 선택한 답변의 type과 `pointArray`에서 작성한 name의 동물 이름이 같다면 `pointArray`의 value 값에 1을 더하게 됩니다. 그리고 `sort` 메소드를 사용하여 재정렬을 해 줍니다. 결론적으로 결과값은 `resultArray`의 첫 번째 key(동물 이름)이 나오게 되는 것입니다.

그러나 위에 작성한 코드는 너무 복잡하고, for문도 3번이나 중첩해서 사용하기 때문에 이해하기도 어려울 수 있습니다. 더욱 간단하게 하기 위해서 `data.js`에서 동물의 이름들을 번호로 바꾸어 주었습니다.

```javascript
q: '1. 이성 사이에 진정한 친구는 있다, 없다?',
    a: [
      { answer: 'a. 이성 사이에 친구가 어딨어? 절대 없어', type: [1, 2, 4, 9] },
      { answer: 'b. 친구 있지, 절대 이성으로만 안 보일뿐', type: [0, 3, 6, 5, 10, 8] },
      { answer: 'c. 난 잘 모르겠어..', type: [7, 11] },
    ]
```

```javascript
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
      const target = qnaList[qIdx].a[idx].type; // 추가 부분
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
}
```
그리고 답변을 선택하였을 때, 거기에 해당하는 type의 번호에 숫자들을 + 1을 해 주어서 결과적으로 제일 큰 수를 찾아내는 것이 더 간단한 알고리즘이 될 것입니다.

```javascript
function setResult () {
  let point = calcResult();
  const resultName = document.querySelector('.resultName');
  resultName.innerHTML = infoList[point].name;

  const resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  let imgURL = `https://raw.githubusercontent.com/nani6765/MyMBTI/main/%235.%20Img%20Version/img/image-${point}.png`
  resultImg.src = imgURL;
  resultImg.alt = point;
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}
```

저는 이미지를 다운로드 하지 않고 강사님 [github](https://github.com/nani6765/MyMBTI) 주소에 있는 이미지 링크를 그대로 사용하기 위해서 강의와는 조금 다르게 작성하였습니다. 이미지 순서는 동물의 교유 번호와 같기 때문에 이미지 번호 부분에만 `${point}`를 사용하여서 번호가 바뀌면서 이미지도 바뀌게 설정해 주었습니다.
