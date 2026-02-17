const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject, getProjectsCount } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.get('/count', getProjectsCount);
router.get('/', getProjects);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
