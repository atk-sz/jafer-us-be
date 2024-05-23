import express from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { loginUser, logoutUser, registerUser } from "./controllers/user.js";
import { authCheck } from "./middlewares/authMiddleware.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// to improve performance drastically by compressing data on req/res
app.use(compression());
// to accept request from frontend url
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// to accept json data or body data for POST request
app.use(
  express.json({
    limit: "3gb",
  })
);
// to accept json data or body data for PUT/PATCH request
app.use(
  express.urlencoded({
    limit: "3gb",
    extended: true,
  })
);
// to read cookies
app.use(cookieParser());

app.get("/1", (req, res) => {
  res.send("Congrats working fine");
});

app.get("/", authCheck, (req, res) => {
  res.send("Congrats you are authenticated");
});

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout", logoutUser);

app.listen(process.env.PORT || 3001, () => console.log("Server started"));
