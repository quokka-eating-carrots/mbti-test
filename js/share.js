function setShare () {
  const resultImg = document.querySelector('#resultImg');
  const resultAlt = resultImg.firstElementChild.alt;

  const shareTitle = '십이간지 연애유형 결과';
  const shareDes = infoList[resultAlt].name;
  const shareImage = `https://raw.githubusercontent.com/nani6765/MyMBTI/main/%235.%20Img%20Version/img/image-${resultAlt}.png`
  const shareURL = `https://profound-fenglisu-8cfc4f.netlify.app/page/result-${resultAlt}`
  
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: shareDes,
      imageUrl:
        shareImage,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL,
      },
    },
    buttons: [
      {
        title: '결과 확인하기',
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
    ],
  });
};