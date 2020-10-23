const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const app = (module.exports = express());

const users = require('./controllers/users')();
const projects = require('./controllers/projects')();
app.use(bodyParser.json());

app.get('/users', users.getController);
app.get('/users/:email', users.getByEmail);
app.post('/users', users.postController);

app.get('/projects', projects.getController);
app.get('/projects/:slug', projects.getBySlug);
app.post('/projects', projects.postController);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, hostname, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
