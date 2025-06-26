const mongoose = require("mongoose")
const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("db connection");

    } catch (error) {
        console.log(error.message)

    }
}

module.exports = connectDB;
