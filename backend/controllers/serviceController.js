const Service = require('../models/Service');

const getServices = async (req, res) => {
    try {
        console.log('Query params:', req.query);
        if (req.query.count === 'true') {
            const count = await Service.countDocuments({});
            console.log('Returning service count:', count);
            return res.json({ count });
        }
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createService = async (req, res) => {
    const { title, description, iconName } = req.body;
    try {
        const service = await Service.create({ title, description, iconName });
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            service.title = req.body.title || service.title;
            service.description = req.body.description || service.description;
            service.iconName = req.body.iconName || service.iconName;
            const updatedService = await service.save();
            res.json(updatedService);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            await service.deleteOne();
            res.json({ message: 'Service removed' });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getServicesCount = async (req, res) => {
    try {
        const count = await Service.countDocuments({});
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getServices, createService, updateService, deleteService, getServicesCount };
