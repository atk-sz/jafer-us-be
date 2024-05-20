import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// to accept request from frontend url
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// to accept json data or body data
app.use(
  express.json({
    limit: "3gb",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Hello World");
});

app.listen(process.env.PORT || 3001, () => console.log("Server started"));
