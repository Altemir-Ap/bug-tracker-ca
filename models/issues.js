const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;

const COLLECTION = 'issues';

module.exports = () => {
  const acceptableStatus = ['wip', 'blocked', 'open', 'closed'];
  const get = async (issueNumber = null) => {
    if (!issueNumber) {
      const allIssues = await db.get(COLLECTION);
      if (allIssues.length == 0) {
        return {
          error: 'No issues registered',
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
  const getByProject = async (slug) => {
    PIPELINE = [
      {
        $lookup: {
          from: 'issues',
          localField: '_id',
          foreignField: 'project_id',
          as: 'issues',
        },
      },
      { $match: { slug } },
      {
        $project: {
          'issues.project_id': 0,
        },
      },
    ];
    const issueByProject = await db.aggregate('projects', PIPELINE);

    if (!issueByProject[0]) {
      return {
        message: `The ${slug} slug, does not exist`,
      };
    }
    if (issueByProject[0].issues.length == 0) {
      return {
        message: `There is no issues for ${slug} slug `,
      };
    }
    return issueByProject;
  };

  const add = async (slug, title, description, status) => {
    if (!acceptableStatus.includes(status)) {
      return {
        message: 'You must include a valid status: wip, blocked, ',
      };
    }

    const project = await db.get('projects', { slug });
    const { project_id, slugName } = project[0];
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

  const status = async (issueNumber, status) => {
    if (!acceptableStatus.includes(status)) {
      return {
        message: 'You must include a valid status',
      };
    }
    const PIPELINE = [
      { issueNumber: issueNumber },
      { $set: { status: status } },
    ];
    const results = await db.update(COLLECTION, PIPELINE);
    return results.result;
  };

  return {
    get,
    add,
    getByProject,
    status,
  };
};
