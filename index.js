const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const app = (module.exports = express());

const users = require('./controllers/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')();

app.use(bodyParser.json());

app.get('/users', users.getController); // get all users
app.get('/users/:email', users.getByEmail); //get individual user
app.post('/users', users.postController); // add user

app.get('/issues', issues.getController); //get all issues
app.get('/issues/:issueNumber', issues.getByIssueNumber); // get individual issue
app.get('/projects/:project_id/issues', issues.getByProjectId); // get all issues for a project
app.post('/projects/:slugName/issues', issues.postController); // add an issue for a project
app.put('/projects/:slugName/issues/:issueNumber/:status', comments.updateStatus); // update an issue status

app.get('/projects', projects.getController); //get all projects
app.get('/projects/:slug', projects.getBySlug); // Add a single project
app.post('/projects', projects.postController);// Add a new project


app.get('/issues/:issueNumber/comments', comments.getAll); //get All comments for an issue
app.get('/issues/comments/:commentId', comments.getComment) //get a single Comment By Id
app.post('/issues/:issueNumber/comments', comments.addComment); //Add a single comment for an issue


app.get('/', (req, res) => {
  res.send('Hello world com issues');
});

app.listen(port, hostname, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
