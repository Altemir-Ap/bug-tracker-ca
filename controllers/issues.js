const issues = require('../models/issues')();

module.exports = () => {
  const getController = async (req, res) => {
    const { issues, error } = await issues.get();
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(issues);
  };
  const getByIssueNumber = async (req, res) => {
    const { issues, error } = await issues.get(req.params.issueNumber);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(issues);
  };
  const getByProjectSlug = async (req, res) => {
    const { issues, error } = await issues.get(req.params.projectSlug);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(issues);
  };
  const postController = async (req, res) => {
    let slugName = req.params.slugName;
    let { title, description, status } = req.body;

    let { result, error } = await issues.add(
      slugName,
      title,
      description,
      status,
    );
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(result);
  };

  const updateStatus = async (req, res) => {
    let { issueNumber, status } = req.params;

    const { result, error } = await issues.status(issueNumber, status);
    if (error) {
      res.status(500).json({
        error,
      });
    }
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
