const { Router } = require('express');

const MovieController = require('./MovieController');

const router = Router();

router.get('/find', MovieController.find);
router.get('/popular', MovieController.popular);
router.get('/top_rated', MovieController.top);
router.get('/upcoming', MovieController.upcoming);
router.get('/:id', MovieController.showMovieDetailPage);

module.exports = router;
