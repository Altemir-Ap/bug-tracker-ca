const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;

const COLLECTION = 'issues';

module.exports = () => {
  const get = async (issueNumber = null) => {
    if (!issueNumber) {
      const allIssues = await db.get(COLLECTION);
      if (allIssues.length == 0) {
        return {
          error: '',
        };
      }
      return allIssues;
    }
    const singleIssue = await db.get(COLLECTION, { issueNumber });
    if (singleIssue.length == 0) {
      return {
        error: 'Issue not found',
      };
    }
    return singleIssue;
  };

  const getByProject = async (issueNumber) => {
    let regex = new RegExp(issueNumber);
    const issueByProject = await db.get(COLLECTION, { issueNumber: regex });
    if (issueByProject.length == 0) {
      return {
        error: 'Issue not found',
      };
    }
    return issueByProject;
  };

  const add = async (slugName, title, description, status, project_id) => {
    const issuesCounter = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      issueNumber: `${slugName}-${issuesCounter + 1}`,
      title: title,
      description: description,
      status: status,
      project_id: new ObjectID(project_id),
      comments: [],
    });
    return results.result;
  };

  return {
    get,
    add,
    getByProject,
  };
};
