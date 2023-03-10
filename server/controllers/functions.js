import axios from "axios";
import express from "express";
import mongoose from "mongoose";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import multer from "multer";
import fs from "fs"
import bcrypt from "bcrypt";
const app = express();

mongoose.connect("mongodb+srv://admin-khushboo:khushboo9198@cluster0.mrg3ztd.mongodb.net/imageDB", { useNewUrlParser: true }).then(() => console.log("connected successfully")).catch((err) => console.log(err));

const imageSchema = new mongoose.Schema({
    id: String,
    name: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

const publicSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    mobile: Number,
    role: String,
    password: String
});

const imageModel = mongoose.model("imageModel", imageSchema);

const publicModel = mongoose.model("publicModel", publicSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not a Image File!!"), false);
    }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });     // to use this storage engine.the define engine is "storage"

export const middleWare = upload.single('testImage');

export const SaveImage = async function (req, res) {
    console.log(req.body);
    const saveImage = new imageModel({
        id: uuid(),
        name: req.body.name,
        img: {
            data: fs.readFileSync("./images/" + req.file.filename),
            contentType: "image/png"
        }
    });
    await saveImage.save().then(() => console.log('image is saved')).catch((err) => console.log(err));
    res.send("Success");
}

export const MyFunction = async function (req, res) {
    const allData = await imageModel.find();
    res.json(allData);
}

export const MyLogIn = async function (req, res) {
    const { email, password, role } = req.body;
    const response = await publicModel.findOne({ email: email, role: role });
    if (response) {
        bcrypt.compare(password, response.password).then(function (result) {
            if (result) {
                res.send(response.mobile);
            }
            else {
                res.send({ message: "Invalid ceredentials" });
            }
        });
    }
    else {
        res.send({ message: "User not found" });
    }
}



export const MySignUp = async function (req, res) {
    const { name, email, mobile, role, password } = req.body;
    const response = await publicModel.findOne({ email: email });
    if (response) {
        res.send({ message: "User already exist with this email" });
    }
    else {
        // bcrypt.genSalt(12, function (err, salt) {
        //     bcrypt.hash(password, salt, function (err, hash) {
        //         const user = new publicModel({
        //             id: uuid(),
        //             name: name,
        //             email: email,
        //             mobile: mobile,
        //             role: role,
        //             password: hash
        //         });
        //         user.save();
        //     });
        // });
        bcrypt.hash(password, 12).then(function (hash) {
            const user = new publicModel({
                id: uuid(),
                name: name,
                email: email,
                mobile: mobile,
                role: role,
                password: hash
            });
            user.save();
        });
        res.send({ message: "Registered successfully" });
    }
}