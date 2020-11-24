const db = require('../db')();
const COLLECTION = 'users';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = () => {
  const get = async (email = null) => {
    try {
      if (!email) {
        const user = await db.get(COLLECTION);
        return { user };
      }
      const user = await db.get(COLLECTION, {
        email,
      });
      return { user };
    } catch (err) {
      console.log(err);
      return {
        error: err,
      };
    }
  };

  const add = async (name, email, usertype, userKey) => {
    if (!name || !email || !usertype || !userKey) {
      return {
        error: 'Please provide all the fields',
      };
    }

    try {
      const user = await db.get(COLLECTION, {
        email,
      });
      if (user.length > 0) {
        return {
          results: 'User already registered',
        };
      }

      const key = bcrypt.hashSync(userKey, salt);
      const results = await db.add(COLLECTION, {
        name,
        email,
        usertype,
        key,
      });
      return { results };
    } catch (err) {
      console.log(err);
      return {
        error: err,
      };
    }
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
