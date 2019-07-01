const contentNode = document.getElementById('content');
const mainMessage = document.getElementById('mainMessage');
mainMessage.className = 'main-message';

const displayData = (data) => {
  data.forEach((element) => {
    const newNode = document.createElement('div');
    const titleNode = document.createElement('div');
    const answerNode = document.createElement('div');
    const title = document.createElement('span');
    const msg = document.createElement('span');
    const content = document.createElement('p');
    const answer = document.createElement('textarea');
    answer.setAttribute('type', 'text');
    answer.className = 'answer';
    answerNode.className = 'answer-node';
    const submitBtn = document.createElement('button');
    title.textContent = `<<< ${element.title} >>>`;
    content.textContent = element.content;
    content.className = 'content';

    submitBtn.textContent = 'أجب';
    submitBtn.className = 'submitBtn';
    msg.className = 'msg';
    // add classes to elements
    title.className = 'container__content--title';
    titleNode.className = 'titleNode--title';
    titleNode.appendChild(title);
    newNode.appendChild(content);
    answerNode.appendChild(answer);
    answerNode.appendChild(submitBtn);
    contentNode.appendChild(titleNode);
    contentNode.appendChild(newNode);
    newNode.appendChild(answerNode);
    newNode.appendChild(msg);
    newNode.style.display = 'none';
    answer.addEventListener('input', () => {
      msg.textContent = '';
    });
    // add event listener to add answer button
    submitBtn.addEventListener('click', () => {
      answer.textContent = '';
      if (!answer.value.trim()) {
        msg.textContent = 'الرجاء إدخال إجابة';
        return;
      }
      if (answer.value.trim().length < 15) {
        msg.textContent = 'يجب إدخال على الأقل 15 حرفاً';
        return;
      }
      // post data to database

      if (answer.value.trim()) {
        const postData = {
          id: element.id,
          answer: answer.value.trim(),
        };
        fetch('/addans', {
          method: 'POST',
          body: JSON.stringify(postData),
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(() => {
            swal('تمت اﻹجابة بنجاح');
            contentNode.removeChild(titleNode);
            contentNode.removeChild(newNode);
          })
          .catch(e => msg.textContent = e);
      }
    });
    // toggle visibility
    title.addEventListener('click', () => {
      if (newNode.style.display === 'none') {
        newNode.style.display = 'block';
      } else {
        newNode.style.display = 'none';
      }
    });
    // change cursor
    title.style.cursor = 'pointer';
  });
};

// windows on load (load data)

mainMessage.textContent = '>>استفسارات جديدة<<';
window.onload = fetch('/getNotAns', {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())
  .then(res => displayData(res))
  .catch(e => errorMsg.textContent = e);
