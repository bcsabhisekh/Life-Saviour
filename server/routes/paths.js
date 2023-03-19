import express from "express"
import { MyFunction, middleWare, SaveQuery, UserLogIn, UserSignUp, DriverLogIn, DriverSignUp, AdminLogIn, AdminSignUp } from "../controllers/functions.js";

const router = express.Router();

router.post("/query", middleWare, SaveQuery);
router.post("/userlogin", UserLogIn);
router.post("/usersignup", UserSignUp);
router.post("/driverlogn", DriverLogIn);
router.post("/driversignup", DriverSignUp);
router.post("/adminlogin", AdminLogIn);
router.post("/adminsignup", AdminSignUp);
router.get("/", MyFunction);

export default router;