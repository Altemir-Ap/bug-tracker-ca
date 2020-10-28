const db = require('../db')();
const COLLECTION = 'users';

module.exports = () => {
  const get = async (email = null) => {
    if (!email) {
      const allUsers = await db.get(COLLECTION);
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

  const add = async (name, email, usertype, key) => {
    const results = await db.add(COLLECTION, {
      name: name,
      email: email,
      usertype: usertype,
      key: key,
    });

    return results.result;
  };

  return {
    get,
    add,
  };
};
