import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import cors from "cors";
import pathRoutes from "./routes/paths.js";
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true, }));
app.use(express.json());
app.use(cors());
app.use("/", pathRoutes);

app.all("*", function(req, res){
    res.send("This Route doesn't exist");
});

app.listen(PORT, function(){
    console.log("Server is running at port " + PORT);
});