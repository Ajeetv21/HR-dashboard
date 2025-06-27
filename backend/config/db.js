const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        // mongodb+srv://Ajeet:<db_password>@cluster0.khfs9wf.mongodb.net/

        await mongoose.connect(process.env.MONGODB_URI  , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });

        console.log("db connection");

    } catch (error) {
        console.log(error.message)

    }
}

module.exports = connectDB;
