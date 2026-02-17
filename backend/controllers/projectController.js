const Project = require('../models/Project');

const getProjects = async (req, res) => {
    try {
        console.log('Query params:', req.query);
        if (req.query.count === 'true') {
            const count = await Project.countDocuments({});
            console.log('Returning count:', count);
            return res.json({ count });
        }
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProject = async (req, res) => {
    const { title, category, imageUrl } = req.body;
    try {
        const project = await Project.create({ title, category, imageUrl });
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            project.title = req.body.title || project.title;
            project.category = req.body.category || project.category;
            project.imageUrl = req.body.imageUrl || project.imageUrl;
            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjectsCount = async (req, res) => {
    try {
        const count = await Project.countDocuments({});
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProjects, createProject, updateProject, deleteProject, getProjectsCount };
