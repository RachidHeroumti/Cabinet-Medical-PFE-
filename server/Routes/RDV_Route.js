import express from "express"
import { AddRDV, getRDV, getMyRDVs,getDodRdvs,DeleteRdv } from "../Controllers/RDVController.js"
import { protect,ProtectForAdmin,ProtectMedcin} from '../tools/AuthMiddkwars.js'
const route = express.Router();


route.post("/Add-rdv", AddRDV);
route.get("/get-rdv/:id", getRDV);
route.get("/get-Myrdvs/:userId", getMyRDVs);
route.get("/get-rdvsDoc/:userId", getDodRdvs);
route.get("/delete-rdv/:id", DeleteRdv);


export default route;
