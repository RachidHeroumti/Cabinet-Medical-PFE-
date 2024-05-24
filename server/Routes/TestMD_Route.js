
import express from "express"
import { AddTest,getTestofPatient,addResultTest,getAlltest } from "../Controllers/TestController.js"

const route = express.Router();


route.post("/Add-test",AddTest );
route.get("/get-PatTests", getTestofPatient);
route.post("/result-test",addResultTest);
route.get("/get-testes",getAlltest);


export default route;
