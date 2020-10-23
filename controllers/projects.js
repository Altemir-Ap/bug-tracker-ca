const projects = require('../models/projects')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await projects.get());
  };
  const getBySlug = async (req, res) => {
    res.json(await projects.get(req.params.slug));
  };
  const postController = async (req, res) => {
    let slug = req.body.slug;
    let name = req.body.name;
    let description = req.body.description;

    const result = await projects.add(slug, name, description);
    res.json(result);
  };
  return {
    getBySlug,
    getController,
    postController,
  };
};
