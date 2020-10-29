const users = require('../models/users')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await users.get());
  };
  const getByEmail = async (req, res) => {
    res.json(await users.get(req.params.email));
  };
  const postController = async (req, res) => {
    let { name, email, usertype, key } = req.body;

    const result = await users.add(name, email, usertype, key);
    res.json(result);
  };
  return {
    getByEmail,
    getController,
    postController,
  };
};
