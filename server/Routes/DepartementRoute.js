import express from "express"
import { AddDepartement, getdepartments } from "../Controllers/DeprtController.js";


const Route = express.Router();

Route.post("/add-dep", AddDepartement);
Route.get("/get-deps", getdepartments);

export default Route;
