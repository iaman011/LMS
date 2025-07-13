const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectToDB = async () => {
    try{
        const {connection} = await mongoose.connect(
            process.env.MONGO_URI || `mongodb://127.0.0.1:27017/lms`
        );

        if(connection) {
            console.log(`connection to MongoDB: ${connection.host}`);
        }

    } catch(e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectToDB;