const { Router } = require('express');

const MovieRouter = require('./Movie/MovieRouter');
const MovieController = require('./Movie/MovieController');

const router = Router();

router.get('/', MovieController.index);

router.use('/movies', MovieRouter);

router.use((request, response, next) => response.status(404).render('404'));
router.use((error, request, response, next) => response.render('error', { error: { message: 'Something went wrong :( ' } }));

module.exports = router;
