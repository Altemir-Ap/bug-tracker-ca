const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;

const COLLECTION = 'issues';

module.exports = () => {
  const get = async (issueNumber = null) => {
    try {
      if (!issueNumber) {
        const issues = await db.get(COLLECTION);
        return { issues };
      }

      const issues = await db.get(COLLECTION, {
        issueNumber: issueNumber,
      });
      return { issues };
    } catch (err) {
      return {
        error: err,
      };
    }
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
      { $match: { slug: RegExp(`^${slug}$`, 'i') } },
      {
        $project: {
          'issues.project_id': 0,
        },
      },
    ];

    try {
      const issueByProject = await db.aggregate('projects', PIPELINE);
      return { issueByProject };
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  const add = async (slugName, title, description, status) => {
    try {
      const project = await db.get('projects', { slug: slugName });

      const { _id, slug } = project[0];
      const issuesCounter = await db.count(COLLECTION);
      const results = await db.add(COLLECTION, {
        issueNumber: `${slug}-${issuesCounter + 1}`,
        title: title,
        description: description,
        status: status,
        project_id: new ObjectID(_id),
        comments: [],
      });
      return results.result;
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  const status = async (issueNumber, status) => {
    const PIPELINE = [
      { issueNumber: issueNumber },
      { $set: { status: status } },
    ];
    try {
      const results = await db.update(COLLECTION, PIPELINE);
      return results.result;
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  return {
    get,
    add,
    getByProject,
    status,
  };
};
