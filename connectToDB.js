const dotenv = require('dotenv');
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
dotenv.config();

module.exports.connectToDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            autoIndex: true
        });
        console.log('Connected to Mongodb Atlas');
    } catch (error) {
        console.log('💀 Encountered an error:');
        console.log(error);
    }
}
