
import express from "express"
import { AddTest,getTestofPatient,addResultTest } from "../Controllers/TestController.js"

const route = express.Router();


route.post("/Add-test",AddTest );
route.get("/get-PatTests", getTestofPatient);
route.post("/result-test",addResultTest);


export default route;
