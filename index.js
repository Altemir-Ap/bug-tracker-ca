const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const app = (module.exports = express());

const users = require('./controllers/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
app.use(bodyParser.json());

app.get('/users', users.getController);
app.get('/users/:email', users.getByEmail);
app.post('/users', users.postController);

app.get('/issues', issues.getController);
app.get('/issues/:issueNumber', issues.getByIssueNumber);
app.get('/projects/:project_id/issues', issues.getByProjectId);
app.post('/projects/:slugName/issues', issues.postController);

app.get('/projects', projects.getController);
app.get('/projects/:slug', projects.getBySlug);
app.post('/projects', projects.postController);

app.get('/', (req, res) => {
  res.send('Hello world com issues');
});

app.listen(port, hostname, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
