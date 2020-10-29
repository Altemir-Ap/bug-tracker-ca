const db = require('../db')();
const COLLECTION = 'projects';

module.exports = () => {
  const get = async (slug = null) => {
    if (!slug) {
      const allSlug = await db.get(COLLECTION);
      return allSlug;
    }
    const singleSlug = await db.get(COLLECTION, { slug });
    if (singleSlug.length === 0) {
      return {
        error: 'Slug not found',
      };
    }
    return singleSlug;
  };

  const add = async (slug, name, description) => {
    const results = await db.add(COLLECTION, {
      slug,
      name,
      description,
    });

    return results.result;
  };

  return {
    get,
    add,
  };
};
