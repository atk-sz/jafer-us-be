import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/1", (req, res) => {
  res.send("Working fine");
});

app.listen(process.env.PORT || 3001, () => console.log("Server started"));
