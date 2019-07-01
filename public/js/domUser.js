const out = document.querySelector('.logout-btn');
out.addEventListener('click', () => {
  window.location.href = '/logout';
});

out.style.cursor = 'pointer';

document.querySelector('.home').addEventListener('click', () => {

  window.location.href = '/userProfile';
});
document.querySelector('.qanon').addEventListener('click', () => {
  window.location.href = '/userQ';
});
document.querySelector('.sabqa').addEventListener('click', () => {
  window.location.href = './userPrevQ';
});
document.querySelector('.safhti').addEventListener('click', () => {
  window.location.href = '/userMyProfile';
});

const myUrl = [
  {
    url: 'userProfile',
    class: '.home',
  },
  {
    url: 'userQ',
    class: '.qanon',
  },
  {
    url: 'userPrevQ',
    class: '.sabqa',
  },
  {
    url: 'userMyProfile',
    class: '.safhti',
  },
];

window.onload = myUrl.forEach((element) => {
  if (window.location.href.split('/')[3] === element.url) {
    document.querySelector(element.class).style.color = '#A3BBF8';
  }
  document.querySelector(element.class).style.cursor = 'pointer';
});
