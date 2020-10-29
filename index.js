const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const app = (module.exports = express());

const users = require('./controllers/users')();
const usersModel = require('./models/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')();

app.use(async (req, res, next) => {
  const FailedAuthMessage = {
    error: 'Failed Authentication',
    message: 'Not authorized',
    code: 'xxx',
  };

  const suppliedKey = req.headers['x-api-key'];
  const clientIp =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (!suppliedKey) {
    console.log('Failed authentication, no key suplied');
    new Date(), clientIp;
    FailedAuthMessage.code = '01';
    FailedAuthMessage.message = 'No key supplied';
    return res.status(401).json(FailedAuthMessage);
  }

  const user = await usersModel.getByKey(suppliedKey);

  if (!user) {
    FailedAuthMessage.code = '02';
    FailedAuthMessage.message = 'Bad key Supplied';
    return res.status(401).json(FailedAuthMessage);
  }

  next();
});

app.use(bodyParser.json());

app.get('/users', users.getController); // get all users
app.get('/users/:email', users.getByEmail); //get individual user
app.post('/users', users.postController); // add user

app.get('/issues', issues.getController); //get all issues
app.get('/issues/:issueNumber', issues.getByIssueNumber); // get individual issue
app.get('/projects/:project_id/issues', issues.getByProjectId); // get all issues for a project
app.post('/projects/:slugName/issues', issues.postController); // add an issue for a project
app.put('/projects/:slugName/issues/:issueNumber/:status', issues.updateStatus); // update an issue status

app.get('/projects', projects.getController); //get all projects
app.get('/projects/:slug', projects.getBySlug); // get a single project
app.post('/projects', projects.postController); // Add a new project

app.get('/comments/:email', comments.getByAuthor); //get comments by author
app.get('/comments', comments.getAllComments); //get All comments
app.get('/issues/:issueNumber/comments', comments.getAllCommentsIssue); //get All comments for an issue
app.get('/issues/:issueNumber/comments/:commentId', comments.getComment); //get a single Comment By Id
app.post('/issues/:issueNumber/comments', comments.addComment); //Add a single comment for an issue

app.get('/', (req, res) => {
  res.send('Hello world com issues');
});

app.listen(port, hostname, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});

app.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: 'Route not found',
  });
});
