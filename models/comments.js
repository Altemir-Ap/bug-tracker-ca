const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
  //Get all comments for an issue
  const getAllCommentsIssue = async (issueNumber) => {
    try {
      const PIPELINE = [
        { $match: { issueNumber: RegExp(`^${issueNumber}$`, 'i') } },
        {
          $project: {
            comments: 1,
            _id: 0,
            issueNumber: 1,
          },
        },
      ];
      const getCommentsIssue = await db.aggregate(COLLECTION, PIPELINE);
      return { getCommentsIssue };
    } catch (err) {
      return { error: err };
    }
  };
  //Get a single comment by ID
  const getAComment = async (commentId) => {
    try {
      var PIPELINE = [
        { $match: { 'comments._id': ObjectID(commentId) } },
        {
          $project: {
            comments: {
              $filter: {
                input: '$comments',
                as: 'comment',
                cond: { $eq: ['$$comment._id', ObjectID(commentId)] },
              },
            },
            _id: 0,
            issueNumber: 1,
          },
        },
      ];
      const comment = await db.aggregate(COLLECTION, PIPELINE);
      return { comment };
    } catch (err) {
      return { error: err };
    }
  };
  //Add a single comment
  const add = async (issueNumber, text, author) => {
    console.log(issueNumber, text, author);
    if (!issueNumber || !text || !author) {
      return {
        error: 'Please provide all the fields',
      };
    }
    try {
      const PIPELINE = [
        { issueNumber: RegExp(`^${issueNumber}$`, 'i') },
        {
          $push: {
            comments: {
              _id: new ObjectID(),
              text: text,
              author: author,
            },
          },
        },
      ];
      const results = await db.update(COLLECTION, PIPELINE);

      return { results };
    } catch (err) {
      return { error: err };
    }
  };

  //Get all comments of all Issues
  const getAll = async () => {
    try {
      const PIPELINE = [
        {
          $project: {
            _id: 0,
            issueNumber: 1,
            comments: 1,
          },
        },
      ];
      const allComments = await db.aggregate(COLLECTION, PIPELINE);

      return { allComments };
    } catch (err) {
      return { error: err };
    }
  };

  //Get all comments for an author
  const getByAuthor = async (email) => {
    try {
      const PIPELINE = [
        { $match: { 'comments.author': RegExp(`^${email}$`, 'i') } },
        {
          $project: {
            comments: {
              $filter: {
                input: '$comments',
                as: 'comment',
                cond: { $eq: ['$$comment.author', RegExp(`^${email}$`, 'i')] },
              },
            },
            _id: 1,
            issueNumber: 1,
          },
        },
      ];
      const getAuthorComments = await db.aggregate(COLLECTION, PIPELINE);
      return { getAuthorComments };
    } catch (err) {
      return { error: err };
    }
  };

  return {
    getAllCommentsIssue,
    add,
    getAComment,
    getAll,
    getByAuthor,
  };
};
