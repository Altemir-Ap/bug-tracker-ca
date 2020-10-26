const comments = require('../models/comments')();

module.exports = () => {
  const getAllIssue = async (req, res) => {
    res.json(await comments.getAllCommentsIssue(req.params.issueNumber));
  };
  const getSingleComment = async(req, res) => {
    res.json(await comments.getAComment(req.params.commentId))
  }
  const addComment = async (req, res) => {
    let issueNumber = req.params.issueNumber;
    let text = req.body.text;
    let author = req.body.author;
    const result = await comments.add(issueNumber, text, author);
    res.json(result);
  };
  const updateStatus = async(req, res)=>{
    let status = req.params.status;
    let issueNumber = req.params.issueNumber;

    const result = await comments.status(issueNumber, status);
    res.json(result);
  }
  return {
    getAllController,
    addComment,
    getSingleComment,
    updateStatus
  };
};