const express = require("express");
const router = express.Router();

const {
  createTask,
  deleteTask,
  updateTask,
  updateUser,
  getTask,
  getSingleTask,
  toggleTaskDone,
} = require("../controllers/userController");
const {
  verifyJwtToken,
  isAdmin,
  isTaskOwnerOrAdmin,
} = require("../authMiddlewares/verifyToken");

router.post("/createTask/:userId", verifyJwtToken, createTask);

router.get("/getTasks/:userId", verifyJwtToken, getTask);

router.get("/getTask/:taskId", verifyJwtToken, getSingleTask);

router.put("/updateTask/:taskId", isTaskOwnerOrAdmin, updateTask);

router.delete("/deleteTask/:taskId", isTaskOwnerOrAdmin, deleteTask);

router.put("/updateUser", updateUser);

router.patch("/toggleDone/:taskId", toggleTaskDone);

module.exports = router;
