const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
  
  const getAllCommentsIssue = async (issueNumber) => {
    const PIPELINE = [
      { $match : { "issueNumber" : issueNumber } },
      { $project: { 
           comments: 1,
          _id:0,
          issueNumber:1}
       }]
       const getCommentsIssue = await db.aggregate(COLLECTION, PIPELINE);
       return getCommentsIssue;

  };

  const getAComment = async (commentId) =>{
    const PIPELINE = [{$match: {'comments._id': ObjectID(commentId)}},
    {$project: {
        comments: {$filter: {
            input: '$comments',
            as: 'comment',
            cond: {$eq: ['$$comment._id', ObjectID(commentId)]}
        }},
        _id: 0,
        issueNumber: 1
    }}]
        const comment = await db.aggregate(COLLECTION, PIPELINE);
        return comment;
  }

  const add = async (issueNumber, text, author) => {

    const PIPELINE = { issueNumber: issueNumber };
    const CONDITION= { $push: { comments: {
      _id : new ObjectID(),
       text : text,
       author : author} } };
    const results = await db.update(COLLECTION, PIPELINE, CONDITION);

    return results.result;
  };

  const status = async (issueNumber, status) => {

    const PIPELINE = { issueNumber: issueNumber };
    const CONDITION= { $set:{status: status} };
    const results = await db.update(COLLECTION, PIPELINE, CONDITION);

    return results.result;
  };

  return {
    getAllCommentsIssue,
    add,
    getAComment,
    status
  };
};
