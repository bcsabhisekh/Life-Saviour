import express from "express"
import { MyFunction, middleWare, SaveImage } from "../controllers/functions.js";

const router = express.Router();

router.post("/upload", middleWare, SaveImage);
router.get("/", MyFunction);

export default router;