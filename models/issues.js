const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;

const COLLECTION = 'issues';

module.exports = () => {
  const acceptableStatus = ['wip', 'blocked', 'open', 'closed'];
  const checkStatus = (status, message) => {
    if (!acceptableStatus.includes(status)) {
      throw message;
    }
  };

  const get = async (issueNumber = null) => {
    if (!issueNumber) {
      const allIssues = await db.get(COLLECTION);
      if (!allIssues[0]) {
        return {
          error: 'No issues registered',
        };
      }
      return allIssues;
    }

    const singleIssue = await db.get(COLLECTION, {
      issueNumber: RegExp(`^${issueNumber}$`, 'i'),
    });

    if (!singleIssue[0]) {
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
      { $match: { slug: RegExp(`^${slug}$`, 'i') } },
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
    if (!issueByProject[0].issues.length) {
      return {
        message: `There is no issues for ${slug} slug `,
      };
    }

    return issueByProject;
  };

  const add = async (slugName, title, description, status) => {
    if (!slugName || !title || !description || !status) {
      return {
        message:
          'you need to provide a slugName, title, description and status',
      };
    }
    try {
      checkStatus(
        status,
        'You must include a valid status: wip, open, closed, blocked',
      );
    } catch (err) {
      return {
        message: err,
      };
    }

    const project = await db.get('projects', { slug: slugName });

    if (project.length == 0) {
      return {
        message: 'Project not found',
      };
    }
    const { project_id, slug } = project[0];
    const issuesCounter = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      issueNumber: `${slug}-${issuesCounter + 1}`,
      title: title,
      description: description,
      status: status,
      project_id: new ObjectID(project_id),
      comments: [],
    });
    return results.result;
  };

  const status = async (issueNumber, status) => {
    try {
      checkStatus(
        status,
        'You must include a valid status: wip, open, closed, blocked',
      );
    } catch (err) {
      return {
        message: err,
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
