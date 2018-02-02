const router = require('express').Router(),
      serverEnv = require('../serverEnv'),
      assert = require('assert');

const match = (val, arr) => {
  return arr.some((item) => {
      return item.name === val
  })
}

async function token (req, res) {
  let query = req.query, db = req.db, col, docs;
  let name = query.name;
  if (!name || name.length < 1) {
    return res.send({
      errcode: 1,
      msg: '姓名为空'
    })
  }
  try {;
    col = await db.collection(serverEnv.dbInfo.dbCol);
    docs = await col.find().toArray();
    db.close();
    if (match(name, docs)) {
      res.send({
        errcode: 1,
        msg: '该同学已经投过票'
      })
    } else {
      res.send({
        errcode: 0,
        msg: ' '
      })
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).end()
  }
}

async function save (req, res) {
  let db = req.db, body = req.body, rowcheck, col, docs;
  let dbName = body.name, dbTime = body.time;
  // console.log(body)
  // return
  if (!dbName || !dbTime.length) {
    return res.send({
      errcode: 1,
      msg: '信息不全'
    })
  }
  try {
    col = await db.collection(serverEnv.dbInfo.dbCol);
    rowcheck = await col.insertOne({
      name: dbName,
      time: dbTime
    })
    assert.equal(1, rowcheck.insertedCount);
    let result = rowcheck.insertedCount === 1 ? {
      errcode: 0,
      msg: '投票成功！'
    } : {
      errcode: 3,
      msg: '系统错误，请稍后再试'
    }
    res.send(result);
  } catch (error) {
    console.log(error.stack);
    res.status(500).end();
  }
}

router.get('/show', (req, res) => {
  async function show () {
    try {
      let col = await req.db.collection(serverEnv.dbInfo.dbCol);
      let docs = await col.find().toArray();
      res.send(docs)
    } catch (error) {
      console.log(error.stack);
      res.status(500).end();
    }
  }
  show()
  // console.log(req.db)
  // res.status(200).end()
})

router.get('/token', (req, res) => {
  token(req, res);
})

router.post('/save', (req, res) => {
  save(req, res);
})

module.exports = router