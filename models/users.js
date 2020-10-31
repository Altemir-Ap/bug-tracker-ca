const db = require('../db')();
const COLLECTION = 'users';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

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

    const singleUser = await db.get(COLLECTION, {
      email: RegExp(`^${email}$`, 'i'),
    });
    if (singleUser.length == 0) {
      return {
        error: 'User not found',
      };
    }

    return singleUser;
  };
  //Add a user
  const add = async (name, email, usertype, userKey) => {
    if (!name || !email || !usertype || !userKey) {
      return {
        message: 'you need to provide a name, email, usertype and userKey',
      };
    }
    const key = bcrypt.hashSync(userKey, salt);
    const results = await db.add(COLLECTION, {
      name,
      email,
      usertype,
      key,
    });
    return results.result;
  };

  const getByKey = async (email, supliedKey) => {
    if (!supliedKey || !email) {
      return {
        error: 'Missing key or email',
      };
    }

    const user = await db.get(COLLECTION, { email });
    const verify = bcrypt.compareSync(supliedKey, user[0].key);
    if (!verify) {
      return {
        error: 'Wrong password',
      };
    }
    return user[0];
  };
  return {
    get,
    add,
    getByKey,
  };
};
