const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const db = await mongoose.connect(`mongodb+srv://shrawanprajapat999:Shrawan@cluster0.rprkd.mongodb.net/movie-poster-crud`, {
          
        });
        console.log(`Database is successfully connected to host: ${db.connection.host}`);
    } catch (err) {
        console.error("Error connecting to the database:", err);
        return false;
    }
};

module.exports = connectDb;
