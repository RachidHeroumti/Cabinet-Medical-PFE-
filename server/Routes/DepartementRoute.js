import express from "express"
import { AddDepartement, getdepartments } from "../Controllers/DeprtController.js";
import { protect,ProtectForAdmin} from '../tools/AuthMiddkwars.js'

const Route = express.Router();

Route.post("/add-dep", AddDepartement);
Route.get("/get-deps", getdepartments);

export default Route;
