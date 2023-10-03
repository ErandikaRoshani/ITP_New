const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const csurf = require("csurf"); // Import csurf middleware

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Use cookie-parser middleware

mongoose.connect(process.env.DB_CONNECT, err => {
  if (err) {
    console.log("MongoDB connection error ", err);
  } else {
    console.log("MongoDB connection success");
  }
});

const csrfProtection = csurf({ cookie: true }); // Create CSRF protection middleware

app.use(csrfProtection); // Use CSRF middleware

// Set the CSRF token as a cookie for all routes
app.use((req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken(), { httpOnly: false });
  next();
});

const routWallet = require("./Routes/FinanceRoute");
app.use("/api/finance", routWallet);

const routeProduct = require("./Routes/StoreRoute");
app.use("/api/store", routeProduct);

const routCareer = require("./Routes/JobRoute");
app.use("/api/job", routCareer);

const routEnroll = require("./Routes/StudentRoute");
app.use("/api/student",routEnroll);

const courseroute = require("./Routes/CourseRoute");
app.use("/api/course",courseroute);

const routQuestion = require("./Routes/LecturerRoute");
app.use("/api/lecturer", routQuestion);

const routAuthentication = require("./Routes/AuthenticationRoute");
app.use("/api/AuthenticationRoute", routAuthentication);

const routReview = require("./Routes/FeedbackRoute");
app.use("/api/feedback", routReview);

app.listen(4000, err => {
  if (!err) {
    console.log("successfully connected to the port ", 4000);
  } else {
    console.log("error occurred ", err);
  }
});
