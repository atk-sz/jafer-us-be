import express from "express";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Hello World");
});

app.listen(process.env.PORT || 3001, () => console.log("Server started"));
