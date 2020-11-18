const db = require('../db')();
const COLLECTION = 'projects';

module.exports = () => {
  const get = async (slugName = null) => {
    try {
      if (!slugName) {
        const slug = await db.get(COLLECTION);
        return { slug };
      }
      const slug = await db.get(COLLECTION, {
        slug: slugName,
      });
      return { slug };
    } catch (err) {
      console.log(err);
      return {
        error: err,
      };
    }
  };

  const add = async (slug, name, description) => {
    try {
      const results = await db.add(COLLECTION, {
        slug,
        name,
        description,
      });

      return results.result;
    } catch (err) {
      console.log(err);
      return {
        error: err,
      };
    }
  };
  return {
    get,
    add,
  };
};
