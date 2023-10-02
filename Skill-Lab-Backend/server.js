const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());

const corsOptions = {
  origin: (origin, callback) => {
    const trustedOrigins = ['http://localhost:3000', 'https://www.google.com/', 'https://mail.google.com/'];

    if (trustedOrigins.includes(origin)) {
      callback(null, true); // Allow requests from trusted origins
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

mongoose.connect(process.env.DB_CONNECT, err => {
  if (err) {
    console.log("mongo connection error ", err);
  } else {
    console.log("Mongodb connection success");
  }
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
  
    console.log("error occured ", err);
  }
});
