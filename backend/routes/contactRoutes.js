const express = require('express');
const router = express.Router();
const {
    getInquiries,
    submitInquiry,
    updateInquiryStatus,
    deleteInquiry
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getInquiries);
router.post('/', submitInquiry);
router.put('/:id/status', protect, updateInquiryStatus);
router.put('/:id', protect, updateInquiryStatus);
router.delete('/:id', protect, deleteInquiry);
router.delete('/delete/:id', protect, deleteInquiry);

module.exports = router;
