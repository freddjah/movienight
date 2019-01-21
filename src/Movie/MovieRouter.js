const { Router } = require('express');

const MovieController = require('./MovieController');
const catchErrors = require('../Middleware/catchErrors');

const router = Router();

router.get('/find', catchErrors(MovieController.find));
router.get('/popular', catchErrors(MovieController.popular));
router.get('/top_rated', catchErrors(MovieController.top));
router.get('/upcoming', catchErrors(MovieController.upcoming));
router.get('/:id', catchErrors(MovieController.showMovieDetailPage));

module.exports = router;
