// distの成果物確認用
const express = require('express');
const app = express();
const parser = require('body-parser');

const axios = require('axios');

app.use(express.static('dist'));
app.get('/test', function(req, res) {
  res.redirect('/');
});

/**
 * local確認用
 * cors回避
 */
const baseUrl = `https://${process.env.API_HOST}`;
// CORSを許可する
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// body parser設定
app.use(parser.urlencoded({ extended: true }));
app.use(parser());

app.put('/invitees/', function(req, res) {
  axios
    .put(`${baseUrl}/invitees/`, req.body, {
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(result => {
      res.json({
        ...result.data
      });
    })
    .catch(error => {
      console.log(`error = ${error.message}`, error);
      res.status(500);
      res.end();
    });
});
app.get('/invitees/user', async function(req, res) {
  const response = await axios.get(`${baseUrl}/invitees/user`);
  res.json(response.data);
});
/**
 * 適当エラーハンドリング
 */
app.use((err, req, res, next) => {
  res.status(500);
  res.send({ error: err });
});
app.listen(3030);

console.log(`
web: http://localhost:3000/
api: http://localhost:3030/
request: ${baseUrl}
`);
