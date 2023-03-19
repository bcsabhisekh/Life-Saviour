import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import pathRoutes from "./routes/paths.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true, }));
app.use(express.json());
app.use(cors());
app.use("/", pathRoutes);

app.all("*", function (req, res) {
    res.send("This Route doesn't exist");
});

app.listen(process.env.PORT, function () {
    console.log("Server is running at port " + process.env.PORT);
});