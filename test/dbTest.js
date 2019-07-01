const test = require('tape');
const DBRun = require('../src/database/build.js');
const getUser = require('../src/database/queries/getUser.js');
const getPosts = require('../src/database/queries/getPosts.js');
const getMyPosts = require('../src/database/queries/getMyPosts.js');
const getNotAns = require('../src/database/queries/getNotAns.js');
const getCons = require('../src/database/queries/getCons.js');
const addUser = require('../src/database/queries/addUser.js');
const addPost = require('../src/database/queries/addPost.js');
const addAns = require('../src/database/queries/addAns.js');

test('test addUser', (assert) => {
  DBRun((err) => {
    if (err) assert.error('error', err);
    else {
      addUser('alaa', '14511').then((result) => {
        assert.equal(result.rows[0].user_name, 'alaa', 'should return alaa')
        assert.end();
      }).catch(e => assert.error(e));
    }
  });
});

test('test fot getUser', (assert) => {
  DBRun((err) => {
    if (err) assert.error('error', err);
    else {
      getUser('Ayman').then((result) => {
        assert.equal(typeof (result), 'object', 'getUser successfully');
        assert.end();
      }).catch(e => assert.error(e));
    }
  });
});

test('test getCons', (assert) => {
  DBRun((err) => {
    if (err) assert.error(err);
    else {
      getCons('أيمن').then((result) => {
        assert.equal(result.rows[0].full_name, 'أيمن القوقا', 'should return أيمن القوقا');
        assert.end();
      }).catch(e => assert.error(e));
    }
  });
});

test('test addPost', (assert) => {
  addPost('welcome user', 'to my page user', 1).then((result) => {
    assert.equal(result.rowCount, 1, 'should return 1');
    assert.end();
  }).catch(e => assert.error(e));
});
test('test addPost', (assert) => {
  addPost('welcome user another post', 'to my page user another post', 1).then((result) => {
    assert.equal(result.rowCount, 1, 'should return 1');
    assert.end();
  }).catch(e => assert.error(e));
});

test('test getPosts', (assert) => {
  getPosts().then((result) => {
    assert.equal(result.rows[0].title, 'welcome user', 'expected welcome user');
    assert.end();
  }).catch(e => assert.error(e));
});

test('test getPosts', (assert) => {
  getPosts().then((result) => {
    assert.equal(result.rows[1].title, 'welcome user another post', 'expected welcome user another post');
    assert.end();
  }).catch(e => assert.error(e));
});

test('test getMyPosts', (assert) => {
  getMyPosts(1).then((result) => {
    assert.equal(result.rows[0].content, 'to my page user', 'expected to my page user');
    assert.end();
  }).catch(e => assert.error(e));
});

test('test addAns', (assert) => {
  addAns('welcome consultant', 1, 1).then((result) => {
    assert.equal(result.rows[0].answer, 'welcome consultant', 'expected welcome consultant');
    assert.end();
  }).catch(e => assert.error(e));
});

test('test getNotAns', (assert) => {
  getNotAns('welcome conultant', 1, 2).then((result) => {
    assert.equal(result.rows[0].answer, null, 'expected null');
    assert.end();
  }).catch(e => assert.error(e));
});
