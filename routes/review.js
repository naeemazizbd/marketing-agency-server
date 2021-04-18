const {
    deleteReview,
    getReviews,
    getReview,
    createReview,
    updateReview,
} = require('../controllers/review');

const router = require('express').Router();

router.get('/', getReviews);
router.get('/:id', getReview);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
