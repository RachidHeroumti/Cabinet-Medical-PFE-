import expres from "express"
import dotenv from "dotenv"
import cors from "cors"
import ConnectDB from "./config/db.js"
import userRoute from "./Routes/UserRoute.js"
import DepartmentRoute from "./Routes/DepartementRoute.js"
import RdvRoute from "./Routes/RDV_Route.js"
import TestRout from "./Routes/TestMD_Route.js"
import NoteRoute from "./Routes/NoteRoute.js"
import MessageRoute from "./Routes/MessageRoute.js"

dotenv.config(); 
const app = expres();
const PORT = process.env.PORT || 3000;

app.use(expres.json());
app.use(cors());

ConnectDB();

app.use("/pfe/api/", userRoute);
app.use("/pfe/api/dep", DepartmentRoute);
app.use("/pfe/api/rdv", RdvRoute);
app.use("/pfe/api/test", TestRout);

app.use("/pfe/api/note", NoteRoute );
app.use("/pfe/api/message", MessageRoute );


app.listen(PORT, () => {
  console.log("listening to port :", PORT);
})

