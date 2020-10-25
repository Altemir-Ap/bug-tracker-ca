const issues = require('../models/issues')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await issues.get());
  };
  const getByIssueNumber = async (req, res) => {
    res.json(await issues.get(req.params.issueNumber));
  };
  const getByProjectId = async (req, res) => {
    res.json(await issues.getByProject(req.params.project_id));
  };
  const postController = async  (req, res) => {
    let slugName = req.params.slugName;
    let title = req.body.title;
    let description = req.body.description;
    let status = req.body.status;
    let project_id = req.body.project_id;

    let result = await issues.add(slugName, title, description, status, project_id);
    res.json(result);
  };

  return {
    getByIssueNumber,
    getController,
    postController,
    getByProjectId,
  };
};
