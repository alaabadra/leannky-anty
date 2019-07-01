const request = require('supertest');
const test = require('tape');
const app = require('../src/app');
const dbRun = require('../src/database/build');

// signup route test
test('Request signup route ', (t) => {
  dbRun((err) => {
    if (err) t.error('error', err);
    request(app)
      .post('/signup')
      .send({
        userName: 'ssadrgvd',
        password: '123456',
        confirmPassword: '123456',
      })
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end((errr, res) => {
        if (errr) {
          t.error(errr);
        } else {
          t.equal(JSON.parse(res.text).msg, 'تم انشاء الحساب بنجاح، يمكنكي الآن تسجيل الدخول', 'must return msg of sucsses signup');
          t.end();
        }
      });
  });
});
test('Request signup route ', (t) => {
  request(app)
    .post('/signup')
    .send({
      userName: 'ssadrgvd',
      password: '123456',
      confirmPassword: '123456',
    })
    .expect(400)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((errr, res) => {
      if (errr) {
        t.error(errr);
      } else {
        t.equal(JSON.parse(res.text).msg, 'اسم المستخدم موجود مسبقا... اختر  اسم آخر', 'must return msg of use another username for signup');
        t.end();
      }
    });
});
// login test
test('Login with existing user ', (t) => {
  request(app)
    .post('/login')
    .send({
      userName: 'Ayman',
      password: '123456',
    })
    .expect(302)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((errr, res) => {
      if (errr) {
        t.error(errr);
      } else {
        t.equal(res.header['set-cookie'][0].includes('jwt='), true, 'should return cookie');
        t.equal(JSON.parse(res.text).redirect, 'userProfile', 'should redirect ot user profile page');
        t.end();
      }
    });
});
// request '/' 
test('Request / page no cookie', (t) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.type, 'text/html', 'type of reponse from route /signup should be text/html');
        t.equal(res.text.includes('إنشاء حساب جديد'), true, ' reponse html page includes جديد');
        t.end();
      }
    });
});
// request '/' with cookie
test('Request / route , cookie', (t) => {
  request(app)
    .get('/')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1vaGFtZWQiLCJ1c2VySWQiOjYsImNvbnN1bHRhbnQiOmZhbHNlLCJsb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNTUzMTc1NjIxfQ.nXV81b4ySr_-Ez-Qt2Kqe29MWltIU7LHT3ymB4249sU'])
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.text.includes('Redirecting'), true, 'response must includes Redirecting');
        t.end();
      }
    });
});
// request userProfile without cookie
test('Request userprofile route no cookie', (t) => {
  request(app)
    .get('/userProfile')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.header.location, '/', 'must redirect to home');
        t.end();
      }
    });
});
// request userProfile with cookie
test('Request userprofile route , cookie', (t) => {
  request(app)
    .get('/userProfile')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1vaGFtZWQiLCJ1c2VySWQiOjYsImNvbnN1bHRhbnQiOmZhbHNlLCJsb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNTUzMTc1NjIxfQ.nXV81b4ySr_-Ez-Qt2Kqe29MWltIU7LHT3ymB4249sU'])
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.text.includes('الديانة'), true, 'reponse html page includes الديانة');
        t.end();
      }
    });
});
// request userQ without cookie
test('Request user qustion route  without cookie', (t) => {
  request(app)
    .get('/userQ')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.header.location, '/', 'should redirect to home');
        t.end();
      }
    });
});
// request userQ with cookie
test('Request /userQ route ,cookie', (t) => {
  request(app)
    .get('/userQ')
    .set('cookie', '')
    .set('cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1vaGFtZWQiLCJ1c2VySWQiOjYsImNvbnN1bHRhbnQiOmZhbHNlLCJsb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNTUzMTc1NjIxfQ.nXV81b4ySr_-Ez-Qt2Kqe29MWltIU7LHT3ymB4249sU'])
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.text.includes('مجانية'), true, 'reponse html page includes مجانية');
        t.end();
      }
    });
});
// add post (user question), with cookie
test('add post question with cookie ', (t) => {
  request(app)
    .post('/userq')
    .set('cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNzYWRyZ3ZkIiwidXNlcklkIjoyLCJjb25zdWx0YW50IjpmYWxzZSwibG9nZ2VkSW4iOnRydWUsImlhdCI6MTU1MzYxNDA3OX0.9wGjk_hg3FgKvwJRBUN-XMVC3xIbHugXcmtfM1e5VZE'])
    .send({
      qTitle: 'استشارة قانونللللية',
      qContent: 'استشارة مواللللضوع',
    })
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'تم اضافة الاستفسار بنجاح، الرجاء انتظار الاجابة خلال 24 ساعة وشكرا', 'should return message that post is added successfully');
        t.end();
      }
    });
});
// Request user prev profile route no cookie
test('Request user prev profile route no cookie', (t) => {
  request(app)
    .get('/userPrevQ')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.header.location, '/', 'must redirect to home');
        t.end();
      }
    });
});

// Request userprevprofile route , cookie'
test('Request userprevprofile route , cookie', (t) => {
  request(app)
    .get('/userPrevQ')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1vaGFtZWQiLCJ1c2VySWQiOjYsImNvbnN1bHRhbnQiOmZhbHNlLCJsb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNTUzMTc1NjIxfQ.nXV81b4ySr_-Ez-Qt2Kqe29MWltIU7LHT3ymB4249sU'])
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.text.includes('استفسارات سابقة'), true, 'reponse html page includesاستفسارات سابقة');
        t.end();
      }
    });
});
// Request user /userMyProfile no cookie'
test('Request user /userMyProfile no cookie', (t) => {
  request(app)
    .get('/userMyProfile')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.headers.location, '/', 'Response redirct to home ');
        t.end();
      }
    });
});
// Request  /userMyProfile with cookie
test('Request  /userMyProfile ,cookie', (t) => {
  request(app)
    .get('/userMyProfile')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNzYWRyZ3ZkIiwidXNlcklkIjoyLCJjb25zdWx0YW50IjpmYWxzZSwibG9nZ2VkSW4iOnRydWUsImlhdCI6MTU1MzYxNDA3OX0.9wGjk_hg3FgKvwJRBUN-XMVC3xIbHugXcmtfM1e5VZE'])
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.text.includes('استفساراتي'), true, 'reponse html page includes استفساراتي');
        t.end();
      }
    });
});
// request logout route without cookie
test('request logout route without cookie', (t) => {
  request(app)
    .get('/logout')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.headers.location, '/', 'Response redirct to home ');
        t.end();
      }
    });
});
// Request logout with cookie
test('Request logout ,cookie', (t) => {
  request(app)
    .get('/logout')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1vaGFtZWQiLCJ1c2VySWQiOjYsImNvbnN1bHRhbnQiOmZhbHNlLCJsb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNTUzMTc1NjIxfQ.nXV81b4ySr_-Ez-Qt2Kqe29MWltIU7LHT3ymB4249sU'])
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.headers.location, '/', 'Response redirct to home ');
        t.end();
      }
    });
});
// consultant login
test('Login with existing user ', (t) => {
  request(app)
    .post('/login')
    .send({
      userName: 'أيمن',
      password: '123456',
    })
    .expect(302)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((errr, res) => {
      if (errr) {
        t.error(errr);
      } else {
        t.equal(res.header['set-cookie'][0].includes('jwt='), true, 'should return cookie');
        t.equal(JSON.parse(res.text).redirect, 'consProfile', 'should redirect ot consultant profile page');
        t.end();
      }
    });
});
// At consultant get not answered(new) questions
test('Request not answered(new) questions with cookie', (t) => {
  request(app)
    .get('/getNotAns')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Itij2YrZhdmGIiwidXNlcklkIjoxLCJmdWxsTmFtZSI6Itij2YrZhdmGINin2YTZgtmI2YLYpyIsImNvbnN1bHRhbnQiOnRydWUsImxvZ2dlZEluIjp0cnVlLCJpYXQiOjE1NTM2MjMxNjB9.4vlOfVN6EqPw4k6KqYJN2z_U47j-um_HnrespjSuEfU'])
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.text.includes('content'), true, 'should return object of data includes question content');
        t.end();
      }
    });
});
// add consultant answer, with cookie
test('add consultant answer, with cookie', (t) => {
  request(app)
    .post('/addAns')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Itij2YrZhdmGIiwidXNlcklkIjoxLCJmdWxsTmFtZSI6Itij2YrZhdmGINin2YTZgtmI2YLYpyIsImNvbnN1bHRhbnQiOnRydWUsImxvZ2dlZEluIjp0cnVlLCJpYXQiOjE1NTM2MjMxNjB9.4vlOfVN6EqPw4k6KqYJN2z_U47j-um_HnrespjSuEfU'])
    .send({
      id: 1,
      answer: 'yes it will be ok',
    })
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'ok', 'should return ok');
        t.end();
      }
    });
});
// consultant answers get method
test('Request consultant answered questions with cookie', (t) => {
  request(app)
    .get('/consAns')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Itij2YrZhdmGIiwidXNlcklkIjoxLCJmdWxsTmFtZSI6Itij2YrZhdmGINin2YTZgtmI2YLYpyIsImNvbnN1bHRhbnQiOnRydWUsImxvZ2dlZEluIjp0cnVlLCJpYXQiOjE1NTM2MjMxNjB9.4vlOfVN6EqPw4k6KqYJN2z_U47j-um_HnrespjSuEfU'])
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.text.includes('content'), true, 'should return object of data includes question content');
        t.end();
      }
    });
});
// consultant profile page, without cookie
test('Request consultant profile page, without cookie', (t) => {
  request(app)
    .get('/consProfile')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.headers.location, '/', 'should redirect to /');
        t.end();
      }
    });
});
test.onFinish(() => process.exit(0));
