const issues = require('../models/issues')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await issues.get());
  };
  const getByIssueNumber = async (req, res) => {
    res.json(await issues.get(req.params.issueNumber));
  };
  const getByProjectSlug = async (req, res) => {
    res.json(await issues.getByProject(req.params.projectSlug));
  };
  const postController = async (req, res) => {
    let slugName = req.params.slugName;
    let { title, description, status } = req.body;

    let result = await issues.add(slugName, title, description, status);
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
    getByProjectSlug,
    updateStatus,
  };
};
