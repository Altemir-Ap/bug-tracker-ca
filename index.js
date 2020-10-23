const express = require('express');
const bodyParser = require('body-parser');
const users = require('./controllers/users')();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const app = (module.exports = express());
app.use(bodyParser.json());

app.get('/users', users.getController);
app.get('/users/:email', users.getByEmail);
app.post('/users', users.postController);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, hostname, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
