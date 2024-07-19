import express from "express"
import { addNote,getNotePatient } from "../Controllers/NoteController.js"
import { protect,ProtectForAdmin,ProtectMedcin} from '../tools/AuthMiddkwars.js'

const route = express.Router();


route.post("/Add-note", addNote);

route.get("/get-ptnotes", getNotePatient);


export default route;
