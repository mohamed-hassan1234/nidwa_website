const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const Project = require('./models/Project');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
    try {
        await Service.deleteMany();
        await Project.deleteMany();

        const services = [
            {
                title: 'Cloud Infrastructure',
                description: 'Scalable cloud solutions using AWS and Azure to optimize your enterprise performance.',
                iconName: 'Cloud'
            },
            {
                title: 'Cyber Security',
                description: 'Advanced threat protection and security audits to keep your digital assets safe.',
                iconName: 'Shield'
            },
            {
                title: 'Software Development',
                description: 'Custom web and mobile applications tailored to your specific business needs.',
                iconName: 'Code'
            }
        ];

        const projects = [
            {
                title: 'Global Bank Cloud Migration',
                category: 'Cloud Services',
                imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
            },
            {
                title: 'Fintech Mobile App',
                category: 'Development',
                imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
            },
            {
                title: 'Healthcare Security Audit',
                category: 'Cyber Security',
                imageUrl: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
            }
        ];

        await Service.insertMany(services);
        await Project.insertMany(projects);

        console.log('Sample Data Seeded');
    } catch (error) {
        console.error(error);
    }
};

const startApp = async () => {
    await connectDB();
    await seedData();
    process.exit();
};

startApp();
