const db = require('../db')();
const COLLECTION = 'projects';

module.exports = () => {
  const get = async (slug = null) => {
    if (!slug) {
      const allSlug = await db.get(COLLECTION);
      return allSlug;
    }
    const singleSlug = await db.get(COLLECTION, { slug });
    return singleSlug;
  };

  const add = async (slug, name, description) => {
    const results = await db.add(COLLECTION, {
      slug: slug,
      name: name,
      description: description,
    });

    return results.result;
  };

  return {
    get,
    add,
  };
};
