import express from "express"
import { AddRDV, getRDV, getMyRDVs,getDodRdvs } from "../Controllers/RDVController.js"

const route = express.Router();


route.post("/Add-rdv", AddRDV);
route.get("/get-rdv/:id", getRDV);
route.get("/get-Myrdvs/:userId", getMyRDVs);
route.get("/get-rdvsDoc/:userId", getDodRdvs);


export default route;
