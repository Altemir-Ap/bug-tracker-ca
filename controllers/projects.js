const projects = require('../models/projects')();

module.exports = () => {
  const getController = async (req, res) => {
    const { slug, error } = await projects.get();

    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(slug);
  };
  const getBySlug = async (req, res) => {
    const { slug, error } = await projects.get(req.params.slug);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(slug);
  };
  const postController = async (req, res) => {
    const { slug, name, description } = req.body;

    const { result, error } = await projects.add(slug, name, description);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(result);
  };
  return {
    getBySlug,
    getController,
    postController,
  };
};
