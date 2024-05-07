import express from "express"
import { addNote,getNotePatient } from "../Controllers/NoteController.js"

const route = express.Router();


route.post("/Add-note", addNote);

route.get("/get-ptnotes", getNotePatient);


export default route;
