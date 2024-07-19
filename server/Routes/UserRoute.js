import express from "express"
import { Register, Login,getUser,getDoctors,getPatients ,getuserByCIN} from "../Controllers/UserController.js";

import { protect,ProtectForAdmin,ProtectMedcin} from '../tools/AuthMiddkwars.js'

const Route = express.Router();

Route.post("/register", Register);
Route.post("/login", Login);
Route.get("/get-user/:id",getUser);
Route.post("/update-user",);
Route.get("/get-patients",getPatients);
Route.get("/get-doctors",getDoctors);
Route.get("/get-userbycin/:nationalId",getuserByCIN);


export default Route;