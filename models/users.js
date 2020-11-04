const db = require('../db')();
const COLLECTION = 'users';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = () => {
  //Get all or a single user
  const get = async (email = null) => {
    if (!email) {
      const allUsers = await db.get(COLLECTION);
      return allUsers;
    }

    const singleUser = await db.get(COLLECTION, {
      email: email,
    });

    return singleUser;
  };

  const add = async (name, email, usertype, userKey) => {
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

    try {
      const user = await db.get(COLLECTION, {
        email: email,
      });
      const verify = bcrypt.compareSync(supliedKey, user[0].key);
      if (!verify) {
        return {
          error: 'Wrong password',
        };
      }
      return user[0];
    } catch (e) {
      return {
        error: e.message,
      };
    }
  };
  return {
    get,
    add,
    getByKey,
  };
};
