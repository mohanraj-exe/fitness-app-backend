const express = require("express");
const router = express.Router();

const { isAuth, isAdmin } = require("../middleware/requireAuth");
const { signupUser, loginUser, getUsers, getUserById, removeUser } = require("../controller/userController");

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/", isAuth, isAdmin, getUsers);
router.get("/:id", isAuth, getUserById);
router.delete('/:id', isAuth, removeUser);

module.exports = router;
