import axios from "axios";
import express from "express";
import mongoose from "mongoose";
import _ from "lodash";
import {v4 as uuid} from  "uuid";
const app = express();


export const MyFunction = async function(req, res){
    res.send("<h1>Hello World</h1>");
}