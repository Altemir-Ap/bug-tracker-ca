const comments = require('../models/comments')();

module.exports = () => {
  const getAllCommentsIssue = async (req, res) => {
    res.json(await comments.getAllCommentsIssue(req.params.issueNumber));
  };
  const getComment = async (req, res) => {
    res.json(await comments.getAComment(req.params.commentId));
  };
  const addComment = async (req, res) => {
    const { issueNumber, text, author } = req.body;
    const result = await comments.add(issueNumber, text, author);
    res.json(result);
  };

  const getAllComments = async (req, res) => {
    res.json(await comments.getAll());
  };
  const getByAuthor = async (req, res) => {
    let email = req.params.email;
    res.json(await comments.getByAuthor(email));
  };
  return {
    getAllCommentsIssue,
    addComment,
    getComment,
    getAllComments,
    getByAuthor,
  };
};
