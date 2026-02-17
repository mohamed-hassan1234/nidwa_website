const Contact = require('../models/Contact');

const getInquiries = async (req, res) => {
    try {
        const inquiries = await Contact.find({}).sort({ date: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const submitInquiry = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const inquiry = await Contact.create({ name, email, message });
        res.status(201).json(inquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateInquiryStatus = async (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'proceed', 'completed'];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const inquiry = await Contact.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        inquiry.status = status;
        const updatedInquiry = await inquiry.save();
        res.json(updatedInquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Contact.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        await inquiry.deleteOne();
        res.json({ message: 'Inquiry removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getInquiries, submitInquiry, updateInquiryStatus, deleteInquiry };
