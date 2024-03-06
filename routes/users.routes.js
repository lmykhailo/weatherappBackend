const Router = require("express");
const router = new Router();
const usersController = require("../controllers/users.controller");

router.post("/users", usersController.createUser);
router.get("/users/:id", usersController.getOneUser);
router.get("/users", usersController.getUsers);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);
router.get("/useradminrights", usersController.getAdminRights);

module.exports = router;
