const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;

const COLLECTION = 'issues';

module.exports = () => {
  const get = async (issueNumber = null) => {
    try {
      if (!issueNumber) {
        const issue = await db.get(COLLECTION);
        return { issue };
      }

      const issue = await db.get(COLLECTION, {
        issueNumber,
      });
      return { issue };
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
    if (!slugName || !title || !description || !status) {
      return {
        error: 'Please provide all the fields',
      };
    }

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
      return { results };
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  const dueDates = async (issueNumber, dueDate) => {
    let PIPELINE = [
      { issueNumber },
      {
        $set: {
          dueDate,
        },
      },
    ];
    if (!issueNumber || !dueDate) {
      return {
        error: 'You must provide all the fields',
      };
    }
    try {
      const results = await db.update(COLLECTION, PIPELINE);
      return { results };
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  const status = async (issueNumber, status) => {
    if (!issueNumber || !status) {
      return {
        error: 'Please provide all the fields',
      };
    }
    const PIPELINE = [
      { issueNumber: issueNumber },
      { $set: { status: status } },
    ];
    try {
      const results = await db.update(COLLECTION, PIPELINE);
      return { results };
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
    dueDates,
  };
};
