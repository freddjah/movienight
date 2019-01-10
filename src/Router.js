const { Router } = require('express');

const MovieRouter = require('./Movie/MovieRouter');

const router = Router();

router.use('/movies', MovieRouter);

module.exports = router;
