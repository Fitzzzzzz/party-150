const router = express.Router(),
      serverEnv = require('../serverEnv'),
      assert = require('assert');

const match = (val, arr) => {
  return arr.some((item) => {
      return item.name === val
  })
}

async function token (req, res) {
  let body = req.body, db = req.db, col, docs, name;
  try {
    name = body.name;
    col = await db.collection(serverEnv.dbInfo.dbCol);
    docs = await col.find().toArray();
    db.close();
    if (match(name, docs)) {
      res.send({
        errcode: 1,
        msg: '该用户已经投过票'
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
  if (!name || !time.length) {
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
      errorcode: 0,
      msg: 'saved'
    } : {
      errorcode: 3,
      msg: 'system error'
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
      req.send(docs)
    } catch (error) {
      console.log(error.stack);
      res.status(500).end();
    }
  }
  show()
})

router.get('/token', (req, res) => {
  token(req, res);
})

routet.post('/save', (req, res) => {
  save(req, res);
})

module.exports = router