const addQ = document.querySelector('#addQ');
const qTitle = document.querySelector('#qTitle');
const qContent = document.querySelector('#qContent');
const msgField = document.querySelector('.msg');

addQ.addEventListener('click', (event) => {
  event.preventDefault();
  if (qTitle.value.trim() && qContent.value.trim()) {
    const data = {
      qTitle: qTitle.value.trim(),
      qContent: qContent.value.trim(),
    };
    fetch('/userq', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.msg === 'تم اضافة الاستفسار بنجاح، الرجاء انتظار الاجابة خلال 24 ساعة وشكرا') {
          swal('تم اضافة الاستفسار بنجاح، الرجاء انتظار الاجابة خلال 24 ساعة وشكرا');
          qTitle.value = '';
          qContent.value = '';
          msgField.value = '';
        } else {
          msgField.textContent = res.msg;
        }
      })
      .catch((err) => { msgField.textContent = err; });
  } else {
    msgField.textContent = 'الرجاء تعبئة جميع الحقول';
  }
});
