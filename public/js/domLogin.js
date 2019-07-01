const loginBtn = document.querySelector('#login-btn');
const loginUserName = document.querySelector('#login-userName');
const loginPassword = document.querySelector('#login-password');
const loginMsg = document.getElementById('login-form-validation');

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  loginMsg.classList.remove('show-error-msg');
  const userName = loginUserName.value.trim();
  const password = loginPassword.value.trim();
  if (!userName || !password) {
    loginMsg.classList.add('show-error-msg');
  }
  if (userName && password) {
    const data = {
      userName,
      password,
    };
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.msg) {
          loginMsg.textContent = res.msg;
          loginMsg.classList.add('show-error-msg');
        } else if (res.redirect) {
          window.location.href = `/${res.redirect}`;
        }
      }).catch((err) => {
        loginMsg.textContent = err;
        loginMsg.classList.add('show-error-msg');
      });
  }
});
