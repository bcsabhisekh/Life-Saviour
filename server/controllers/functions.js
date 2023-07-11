import axios from "axios";
import express from "express";
import mongoose from "mongoose";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import multer from "multer";
import fs from "fs"
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import promisify from "util";
dotenv.config();

const app = express();
const MONGO_KEY = process.env.MONGO_KEY;

mongoose.connect("mongodb+srv://" + MONGO_KEY + "@cluster0.mrg3ztd.mongodb.net/imageDB", { useNewUrlParser: true }).then(() => console.log("connected successfully")).catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    mobile: Number,
    password: String
});

const adminSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String
});

const querySchema = new mongoose.Schema({
    id: String,
    user_name: String,
    user_email: String,
    user_mobile: Number,
    user_address: String,
    dr_name: String,
    dr_email: String,
    dr_mobile: Number,
    is_open: Boolean,
    img_name: String,
    hospital: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

const hospitalSchema = new mongoose.Schema({
    id: String,
    name: String,
    lat: String,
    log: String,
    accident: Boolean
});

const driverSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    mobile: Number,
    hospital: String,
    free: Boolean
});

const hospitalModel = mongoose.model("hospitalModel", hospitalSchema);

const driverModel = mongoose.model("driverModel", driverSchema);

const userModel = mongoose.model("userModel", userSchema);

const adminModel = mongoose.model("adminModel", adminSchema);

const queryModel = mongoose.model("queryModel", querySchema);

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

export const logOut = async function (req, res) {
    // res.clearCookie('connect.sid');
    res.clearCookie(process.env.COOKIE_NAME);
    req.session.destroy();
    // console.log(req.session);
    res.status(200).send({ message: "Log Out Successfully." });
}


export const checkAuth = async function (req, res) {
    if (req.session.user) {
        res.send({ valid: true, data: req.session.user });
    }
    else
        res.send({ valid: false });
}

const GetDistance = async function (origin, destination) {
    try {
        const data = await axios.get(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${origin}&destinations=${destination}&travelMode=driving&key=${process.env.BING_MAP_KEY}`);
        return data.data.resourceSets[0].resources[0].results[0].travelDistance;
    }
    catch {
        return 1e9;
    }
}


export const SaveQuery = async function (req, res) {

    const accident = req.body.description;

    const userDetail = {
        user_name: req.body.user_name,
        user_email: req.body.email,
        user_mobile: req.body.mobile,
        lat: req.body.lat,
        log: req.body.log
    };

    const response = await hospitalModel.find();

    async function fillOptions() {
        const newresponse = [];
        await Promise.all(response.map(async (item) => {
            const origin = (userDetail.lat + "," + userDetail.log).toString();
            const destination = (item.lat + "," + item.log).toString();
            const obj = {};
            obj.id = item.id;
            obj.name = item.name;
            obj.accident = item.accident;
            obj.distance = await GetDistance(origin, destination);
            obj.driver = await driverModel.findOne({ hospital: item.name, free: true });
            if (obj.driver !== null)
                newresponse.push(obj);
        }));
        return newresponse;
    }

    const newresponse = await fillOptions();

    function compare(a, b) {
        return a.distance - b.distance;
    }

    newresponse.sort(compare);

    let data = { id: uuid(), accident: true, distance: 1e9, driver: { name: "Govt. Employee", email: "csgwalior1@gmail.com", mobile: +91108 }, name: "District Hospital Murar Gwalior" };

    // console.log(newresponse.length);

    for (let i = 0; i < newresponse.length; i++) {
        const obj = newresponse[i];
        if (obj[accident] === true && obj.driver.free === true) {
            // console.log(obj);
            data = obj;
            break;
        }
    }

    const saveQuery = new queryModel({
        id: uuid(),
        user_name: userDetail.user_name,
        user_email: userDetail.user_email,
        user_mobile: userDetail.user_mobile,
        user_address: userDetail.lat + ',' + userDetail.log,
        dr_name: data.driver.name,
        dr_email: data.driver.email,
        dr_mobile: data.driver.mobile,
        is_open: true,
        hospital: data.name,
        img_name: req.body.name,
        img: {
            data: fs.readFileSync("./images/" + req.file.filename),
            contentType: "image/png"
        }
    });

    await saveQuery.save()
        .then(() => console.log('Data is saved'))
        .catch((err) => console.log(err));

    await driverModel.updateOne({ email: data.driver.email }, { $set: { free: false } }).then(() => console.log("Data Updated")).catch((err) => console.log(err));

    res.send(data);
}



export const CloseQuery = async function (req, res) {
    const { dr_email } = req.body;
    if (dr_email !== "csgwalior1@gmail.com")
        await driverModel.updateOne({ email: dr_email }, { $set: { free: true } });
    await queryModel.updateMany({ dr_email: dr_email }, { $set: { is_open: false } });
    res.send({ message: "ok" });
}


export const DriverSignUp = async function (req, res) {
    const { name, email, password, mobile, hospital } = req.body;
    const response = await driverModel.findOne({ email: email });
    if (response) {
        res.send({ message: "User already exist with this email" });
    }
    else {
        bcrypt.hash(password, 12).then(function (hash) {
            const user = new driverModel({
                id: uuid(),
                name: name,
                email: email,
                mobile: mobile,
                password: hash,
                hospital: hospital,
                free: true
            });
            user.save();
        });
        res.send({ message: "Registered successfully" });
    }
}

export const DriverLogIn = async function (req, res) {
    const { email, password } = req.body;
    const response = await driverModel.findOne({ email: email });
    if (response) {
        bcrypt.compare(password, response.password).then(function (result) {
            if (result) {
                req.session.user = { name: response.name, email: response.email, mobile: response.mobile, role: "Ambulance" };
                res.status(200).send(response);
            }
            else {
                res.status(401).send({ message: "Invalid ceredentials" });
            }
        });
    }
    else {
        res.status(401).send({ message: "Client not found" });
    }
}

export const AdminLogIn = async function (req, res) {
    const { email, password } = req.body;
    const response = await adminModel.findOne({ email: email });
    if (response) {
        bcrypt.compare(password, response.password).then(function (result) {
            if (result) {
                res.send(response);
            }
            else {
                res.send({ message: "Invalid ceredentials" });
            }
        });
    }
    else {
        res.send({ message: "Admin not found" });
    }
}

export const AdminSignUp = async function (req, res) {
    const { email, password } = req.body;
    const response = await adminModel.findOne({ email: email });
    if (response) {
        res.send({ message: "Admin already exist with this email" });
    }
    else {
        bcrypt.hash(password, 12).then(function (hash) {
            const admin = new adminModel({
                id: uuid(),
                email: email,
                password: hash
            });
            admin.save();
        });
        res.send({ message: "Admin registered successfully" });
    }
}

export const MyFunction = async function (req, res) {
    const allData = await queryModel.find();
    res.json(allData);
}

export const UserLogIn = async function (req, res) {
    const { email, password } = req.body;
    const response = await userModel.findOne({ email: email });
    if (response) {
        bcrypt.compare(password, response.password).then(function (result) {
            if (result) {
                req.session.user = { name: response.name, email: response.email, mobile: response.mobile, role: "Public" };
                res.status(200).send(response);
            }
            else {
                res.status(401).send({ message: "Invalid ceredentials" });
            }
        });
    }
    else {
        res.status(401).send({ message: "User not found" });
    }
}



export const UserSignUp = async function (req, res) {
    const { name, email, mobile, password } = req.body;
    const response = await userModel.findOne({ email: email });
    if (response) {
        res.send({ message: "User already exist with this email" });
    }
    else {
        bcrypt.hash(password, 12).then(function (hash) {
            const user = new userModel({
                id: uuid(),
                name: name,
                email: email,
                mobile: mobile,
                password: hash
            });
            user.save();
        });
        res.send({ message: "User registered successfully" });
    }
}

export const PostHospitalDetails = async function (req, res) {
    const { name, lat, log, accident } = req.body;
    const hospital = new hospitalModel({
        id: uuid(),
        name: name,
        lat: lat,
        log: log,
        accident: accident
    });
    hospital.save();
    res.send({ message: "ok" });
}

export const GetQuery = async function (req, res) {
    let data;
    if (req.params.role == "Ambulance")
        data = await queryModel.find({ dr_email: req.params.id });
    else
        data = await queryModel.find({ user_email: req.params.id });
    res.json(data);
}