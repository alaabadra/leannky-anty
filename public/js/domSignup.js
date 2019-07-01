const submitBtn = document.querySelector('.submit-btn');
const userName = document.querySelector('#userName');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const msgField = document.querySelector('.msg');

const clearFeilds = (...name) => {
  name.forEach(element => element.value = '');
};

const validate = (userName, password, confirmPassword) => {
  if (!userName || !password || !confirmPassword) {
    msgField.textContent = 'يجب تعبئة جميع الحقول';
    return false;
  }
  if (userName.length < 4 || userName.length > 20) {
    msgField.textContent = 'اسم المستخدم يجب ألا يزيد عن 20 وألا يقل عن 4 أحرف';
    return false;
  }
  if (userName.includes(' ')) {
    msgField.textContent = 'اسم المستخدم يجب ألا يحتوى على فراغات';
    return false;
  }
  if (password.length < 3) {
    msgField.textContent = 'كلمة المرور يجب ألا يقل عن 3 أحرف/أرقام';
    return false;
  }
  if (password.includes(' ')) {
    msgField.textContent = 'كلمة المرور لا تحتوى على فراغات';
    return false;
  }
  if (password !== confirmPassword) {
    msgField.textContent = 'يجب تطابق كلمتي المرور';
    return false;
  }
  return true;
};
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const data = {
    userName: userName.value.trim(),
    password: password.value.trim(),
    confirmPassword: confirmPassword.value.trim(),
  };
  if (validate(data.userName, data.password, data.confirmPassword)) {
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.msg === 'تم انشاء الحساب بنجاح، يمكنكي الآن تسجيل الدخول') {
          swal(res.msg);
          clearFeilds(userName, password, confirmPassword);
        } else {
          msgField.textContent = res.msg;
        }
      }).catch((err) => { msgField.textContent = err; });
  }
});
userName.addEventListener('input', () => msgField.textContent = '');
password.addEventListener('input', () => msgField.textContent = '');
confirmPassword.addEventListener('input', () =>  msgField.textContent = '');
