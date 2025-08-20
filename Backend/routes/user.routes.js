
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');


router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userId/claim', userController.claimForUser);
router.post('/:userId/history', userController.createHistory);

router.get("/history",userController.getHistory);

router.get('/:userId/allhistory', userController.getHistoryForUser);

module.exports = router;

