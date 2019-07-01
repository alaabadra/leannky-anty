const myUrl = [
  {
    url: 'consProfile',
    id: 'nav_main',
  },
  {
    url: 'consAns',
    id: 'nav_prev',
  },
];

window.onload = myUrl.forEach((item) => {
  if (window.location.href.split('/')[3] === item.url) {
    document.getElementById(item.id).style.color = '#A3BBF8';
  }
  document.getElementById(item.id).style.cursor = 'pointer';
});
