const express = require("express");
const {  getAllUsers, register, login, getProfile } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.get('/', authMiddleware, getAllUsers )
router.post('/register', register)
router.post('/login', login)
router.get('/profile',authMiddleware, getProfile)


module.exports = router;
