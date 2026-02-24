const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedAdmin = async () => {
    try {
        await User.deleteMany();
        const admin = await User.create({ 
            username: 'admin',
            password: 'admin_password_2026'
        });
        console.log('Admin User Created');
        process.exit();
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
