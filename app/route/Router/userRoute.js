const express = require('express');
const router = express();
const userController = require('../../controller/userController');

router.get("/", userController.payU);
router.post("/payUMoney", userController.payUMoney);


module.exports = router;