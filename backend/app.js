require("dotenv").config();
const express = require("express")
const employeeRoute =require("./routes/EmployeeRoute")
const authRoute = require("./routes/authRoute")
const candidateRoute = require("./routes/candidateRoute")
const attendenceRoute = require("./routes/attendenceRoute")
const LeaveRoute = require("./routes/LeaveRoute")
const path=require('path');
const app = express();
const bodyParser =require("body-parser");
const cors = require("cors")
const connectDB = require("./config/db")
const fs = require("fs");
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use("/files", express.static("files"));
app.use(express.static('uploads'));



const PORT = 4000;
app.use(bodyParser.json());
app.use(cors())
connectDB();
app.use("/api",LeaveRoute)
app.use('/api/attendence',attendenceRoute)
app.use('/api',candidateRoute)
app.use('/api/employees',employeeRoute)
app.use('/api',authRoute)

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`)
})