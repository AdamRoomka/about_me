const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  decodeToken,
  getAllUserItems,
  createUserItems,
  findItemAndUpdate,
  findItemAndDelete,
  updateUser,
  findUserAndUpdatePassword,
  findUserAndDelete,
  createUser,
  loginUser,
} = require("../controllers/authController");

router.route("/").get(getAllUsers);
router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/token/").get(decodeToken);
router.route("/update/:id").patch(updateUser);
router.route("/deleteUser/:id").patch(findUserAndDelete);
router.route("/updateUserPassword/:id").patch(findUserAndUpdatePassword);

router.route("/items/update/:subID").patch(findItemAndUpdate);
router.route("/items/delete/:subID").patch(findItemAndDelete);
router.route("/items").get(getAllUserItems).patch(createUserItems);

module.exports = router;