import express from "express"
import { Register, Login,getUser,getDoctors } from "../Controllers/UserController.js";


const Route = express.Router();

Route.post("/register", Register);
Route.post("/login", Login);
Route.get("/get-user/:id",getUser);
Route.post("/update-user",);
Route.get("/get-doctors",getDoctors);


export default Route;