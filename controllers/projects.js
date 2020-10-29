const projects = require('../models/projects')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await projects.get());
  };
  const getBySlug = async (req, res) => {
    res.json(await projects.get(req.params.slug));
  };
  const postController = async (req, res) => {
    const { slug, name, description } = req.body;

    const result = await projects.add(slug, name, description);
    res.json(result);
  };
  return {
    getBySlug,
    getController,
    postController,
  };
};
