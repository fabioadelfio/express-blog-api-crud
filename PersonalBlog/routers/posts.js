const express = require(`express`);
const router = express.Router();
const { posts } = require(`../data/db`);
const postController = require(`../controllers/postController`);

router.get(`/`, postController.index);
router.get(`/:id`, postController.show);
router.post(`/`, postController.create);
router.put(`/:id`, postController.update);
router.delete(`/:id`, postController.destroy);

module.exports = router;