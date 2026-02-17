const express = require('express');
const router = express.Router();
const { getServices, createService, updateService, deleteService, getServicesCount } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/count', getServicesCount);
router.get('/', getServices);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
