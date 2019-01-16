const { Router } = require('express');

const MovieRouter = require('./Movie/MovieRouter');
const MovieController = require('./Movie/MovieController');

const router = Router();

router.get('/', MovieController.index);

router.use('/movies', MovieRouter);

module.exports = router;
