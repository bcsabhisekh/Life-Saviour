import express from "express"
import { MyFunction } from "../controllers/functions.js";

const router = express.Router();

router.get("/", MyFunction);

export default router;