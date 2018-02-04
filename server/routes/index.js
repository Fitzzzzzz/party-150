var express = require('express');
var router = express.Router();
const fs = require('fs'),
      path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html', 'utf-8'))
  res.send(html)
});

router.get('/show', (req, res) => {
  res.render('index')
})

module.exports = router;
