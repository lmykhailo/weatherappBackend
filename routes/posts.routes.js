const Router = require("express");
const router = new Router();
const postsController = require("../controllers/posts.controller");

router.post("/posts", postsController.createPost);
router.get("/posts/:id", postsController.getOnePost);
router.get("/posts", postsController.getPosts);
router.put("/posts/:id", postsController.updatePost);
router.delete("/posts/:id", postsController.deletePost);

module.exports = router;
