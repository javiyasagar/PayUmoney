const express = require('express');
const router = express();

const userRouter = require('../route/Router/userRoute');

router.use('/', userRouter);

module.exports = router;
