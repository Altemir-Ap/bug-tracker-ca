const comments = require('../models/comments')();

module.exports = () => {
  const getAllCommentsIssue = async (req, res) => {
    const { getCommentsIssue, error } = await comments.getAllCommentsIssue(
      req.params.issueNumber,
    );
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(getCommentsIssue);
  };

  const getComment = async (req, res) => {
    const { comment, error } = await comments.getAComment(req.params.commentId);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(comment);
  };

  const addComment = async (req, res) => {
    const { issueNumber } = req.params;
    const { text, author } = req.body;
    const { results, error } = await comments.add(issueNumber, text, author);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    if (results)
      res.json({
        message: 'Comment successfully added',
      });
  };

  const getAllComments = async (req, res) => {
    const { allComments, error } = await comments.getAll();
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(allComments);
  };

  const getByAuthor = async (req, res) => {
    let email = req.params.email;
    const { getAuthorComments, error } = await comments.getByAuthor(email);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(getAuthorComments);
  };

  return {
    getAllCommentsIssue,
    addComment,
    getComment,
    getAllComments,
    getByAuthor,
  };
};
