import express from "express"

import {addMessage,getMessageWithAdmin} from "../Controllers/MessageController.js"
const route = express.Router();


route.post("/Add-message",addMessage );

route.get("/get-msgswithadmin/:id",getMessageWithAdmin );

export default route ;