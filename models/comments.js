const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
  //Get all comments for an issue
  const getAllCommentsIssue = async (issueNumber) => {
    const PIPELINE = [
      { $match: { issueNumber: issueNumber } },
      {
        $project: {
          comments: 1,
          _id: 0,
          issueNumber: 1,
        },
      },
    ];
    const getCommentsIssue = await db.aggregate(COLLECTION, PIPELINE);
    if (getCommentsIssue.length == 0) {
      return {
        message: 'This issue has no comments',
      };
    }
    return getCommentsIssue;
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
    } catch (e) {
      return {
        error: 'Id is not valid',
      };
    }
    const comment = await db.aggregate(COLLECTION, PIPELINE);
    if (comment.length == 0) {
      return {
        error: 'Comment not found',
      };
    }
    return comment;
  };

  //Add a single comment
  const add = async (issueNumber, text, author) => {
    const PIPELINE = { issueNumber: issueNumber };
    const CONDITION = {
      $push: {
        comments: {
          _id: new ObjectID(),
          text: text,
          author: author,
        },
      },
    };
    const results = await db.update(COLLECTION, PIPELINE, CONDITION);
    return results.result;
  };

  //Get all comments of all Issues
  const getAll = async () => {
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
    if (allComments.length == 0) {
      return {
        message: 'No comments found',
      };
    }
    return allComments;
  };

  //Get all comments for an author
  const getByAuthor = async (email) => {
    const PIPELINE = [
      { $match: { 'comments.author': email } },
      {
        $project: {
          comments: {
            $filter: {
              input: '$comments',
              as: 'comment',
              cond: { $eq: ['$$comment.author', email] },
            },
          },
          _id: 1,
          issueNumber: 1,
        },
      },
    ];
    const getByAuthor = await db.aggregate(COLLECTION, PIPELINE);
    if (getByAuthor.length == 0) {
      return {
        message: `No comment found for this author: ${email}`,
      };
    }
    return getByAuthor;
  };

  return {
    getAllCommentsIssue,
    add,
    getAComment,
    getAll,
    getByAuthor,
  };
};
