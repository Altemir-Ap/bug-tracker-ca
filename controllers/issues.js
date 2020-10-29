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
  const postController = async (req, res) => {
    let slugName = req.params.slugName;
    let { title, description, status, project_id } = req.body;

    let result = await issues.add(
      slugName,
      title,
      description,
      status,
      project_id,
    );
    res.json(result);
  };

  const updateStatus = async (req, res) => {
    let { issueNumber, status } = req.params;

    const result = await issues.status(issueNumber, status);
    res.json(result);
  };

  return {
    getByIssueNumber,
    getController,
    postController,
    getByProjectId,
    updateStatus,
  };
};
