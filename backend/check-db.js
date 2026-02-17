const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Service = require('./models/Service');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nidwa-ict')
    .then(async () => {
        const pCount = await Project.countDocuments({});
        const sCount = await Service.countDocuments({});
        console.log('Project Count:', pCount);
        console.log('Service Count:', sCount);
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
