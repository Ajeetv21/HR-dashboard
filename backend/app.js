require("dotenv").config();
const express = require("express");
const multer = require('multer');
const cors = require("cors");
const path = require('path');
const connectDB = require("./config/db");
const bodyParser = require('body-parser');
const employeeRoute = require("./routes/EmployeeRoute");
const authRoute = require("./routes/authRoute");
const candidateRoute = require("./routes/candidateRoute");
const attendanceRoute = require("./routes/attendanceRoute");
const profileRoute = require("./routes/ProfileRoute");
const leaveRoute = require("./routes/LeaveRoute");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();

app.use("/files", express.static("files"));
app.use(express.static('uploads'));

app.use('/api/v1', attendanceRoute);
app.use('/api', candidateRoute);
app.use('/api', employeeRoute);
app.use('/api', authRoute);
app.use('/api', profileRoute);
app.use('/api',leaveRoute)


const upload = multer();

app.get("/", (req, res) => {
    res.send("hello")
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
