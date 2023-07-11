import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import pathRoutes from "./routes/paths.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);

dotenv.config();

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

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["POST", "GET", "PUT", "PATCH"],
    }
})

io.on("connection", (socket) => {
    console.log(socket.id);

    // here data is id
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} and Room ID: ${data}`);
    })

    socket.on("send_message", (data) => {
        // console.log(data);
        socket.to(data.room).emit("recieve_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
});

app.use("/", pathRoutes);

app.all("*", function (req, res) {
    res.send("This Route doesn't exist");
});

server.listen(process.env.PORT, function () {
    console.log("Server is running at port " + process.env.PORT);
});