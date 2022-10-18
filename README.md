# mbti-test

[참고 강의](https://edu.goorm.io/lecture/25652/하루-10분-web-project-html-js-css로-나만의-mbti-사이트-만들기)<br>
[완성 페이지]()

---
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