const express = require('express');

const app = express();

app.use(express.json());

app.post('/pay', (req, res, next) => {
  console.log(`REQUEST_BODY: `, req.body);
  console.log(`REQUEST_PARAMS: `, req.params);
  console.log(`REQUEST_QUERY: `, req.query);
  next();
});

// Express.js server
// Return URL http://localhost:4000/result
app.get('/result', (req, res, next) => {
  res.status(200).send(req.query);
  next();
});

app.listen(4000, () => console.log('express running...'));
