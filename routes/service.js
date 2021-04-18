const {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
} = require('../controllers/service');
const serviceValidator = require('../validators/service');

const router = require('express').Router();

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', serviceValidator, createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;

// api/services/get-service/:id
