import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import pathRoutes from "./routes/paths.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true, }));
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "PUT", "PATCH"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    name: process.env.COOKIE_NAME,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use("/", pathRoutes);

app.all("*", function (req, res) {
    res.send("This Route doesn't exist");
});

app.listen(process.env.PORT, function () {
    console.log("Server is running at port " + process.env.PORT);
});