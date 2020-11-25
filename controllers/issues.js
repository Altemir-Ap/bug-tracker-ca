const issues = require('../models/issues')();

module.exports = () => {
  const getController = async (req, res) => {
    const { issue, error } = await issues.get();
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(issue);
  };
  const getByIssueNumber = async (req, res) => {
    const { issue, error } = await issues.get(req.params.issueNumber);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(issue);
  };
  const getByProjectSlug = async (req, res) => {
    const { issueByProject, error } = await issues.getByProject(
      req.params.projectSlug,
    );
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(issueByProject);
  };
  const postController = async (req, res) => {
    let slugName = req.params.slugName;
    let { title, description, status } = req.body;

    let { results, error } = await issues.add(
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
    res.json(results);
  };

  const updateStatus = async (req, res) => {
    let { issueNumber, status } = req.params;

    const { results, error } = await issues.status(issueNumber, status);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(results);
  };

  const addDue = async (req, res) => {
    let { issueNumber } = req.params;
    let { dueDate } = req.body;

    const { results, error } = await issues.dueDates(issueNumber, dueDate);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(results);
  };

  return {
    getByIssueNumber,
    getController,
    postController,
    getByProjectSlug,
    updateStatus,
    addDue,
  };
};
