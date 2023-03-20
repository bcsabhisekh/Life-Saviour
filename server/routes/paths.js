import express from "express"
import { MyFunction, middleWare, SaveQuery, UserLogIn, UserSignUp, DriverLogIn, DriverSignUp, AdminLogIn, AdminSignUp, PostHospitalDetails } from "../controllers/functions.js";

const router = express.Router();

router.post("/query", middleWare, SaveQuery);
router.post("/userlogin", UserLogIn);
router.post("/usersignup", UserSignUp);
router.post("/driverlogin", DriverLogIn);
router.post("/driversignup", DriverSignUp);
router.post("/adminlogin", AdminLogIn);
router.post("/adminsignup", AdminSignUp);
router.post("/hospitaldetails", PostHospitalDetails);
router.get("/", MyFunction);

export default router;