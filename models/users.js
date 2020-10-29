const db = require('../db')();
const COLLECTION = 'users';

module.exports = () => {
  //Get all or a single user
  const get = async (email = null) => {
    if (!email) {
      const allUsers = await db.get(COLLECTION);
      if (allUsers.length == 0) {
        return {
          error: 'There is no users registered',
        };
      }
      return allUsers;
    }
    const singleUser = await db.get(COLLECTION, { email });
    if (singleUser.length == 0) {
      return {
        error: 'User not found',
      };
    }

    return singleUser;
  };
  //Add a user
  const add = async (name, email, usertype, key) => {
    const results = await db.add(COLLECTION, {
      name,
      email,
      usertype,
      key,
    });

    return results.result;
  };

  const getByKey = async (key) => {
    if (!key) {
      console.log(`01: missing key`);
      return null;
    }

    const users = await db.get(COLLECTION, { key });
    if (users.length !== 1) {
      console.log('02: Bad key');
      return null;
    }

    return users[0];
  };

  return {
    get,
    add,
    getByKey,
  };
};
