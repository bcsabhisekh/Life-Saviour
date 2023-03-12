import express from "express"
import { MyFunction, middleWare, SaveImage, MyLogIn, MySignUp } from "../controllers/functions.js";

const router = express.Router();

router.post("/upload", middleWare, SaveImage);
router.post("/login", MyLogIn);
router.post("/signup", MySignUp);
router.get("/", MyFunction);

export default router;