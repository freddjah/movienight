const { Router } = require('express');

const MovieController = require('./MovieController');

const router = Router();

router.get('/find', MovieController.find);
router.get('/:id', MovieController.showMovieDetailPage);

module.exports = router;
