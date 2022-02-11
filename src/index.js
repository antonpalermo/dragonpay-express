const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/payment', (req, res, next) => {
  console.log(req.body);

  res.setHeader('Content-Type', 'application/json');
  res.send({ message: 'ok' });
});

// Express.js server
// Return URL http://localhost:4000/result
app.get('/result', (req, res, next) => {
  res.status(200).send(req.query);
  next();
});

app.listen(process.env.PORT | 4000, () => console.log('express running...'));
