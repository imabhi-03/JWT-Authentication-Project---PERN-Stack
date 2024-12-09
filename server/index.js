import express from "express";
import cors from "cors";
import authRouter from  "./routes/jwtAuth.js";
import dashboardRouter from "./routes/dashboard.js";

const app=express();
const port=5000;


app.use(cors());
app.use(express.json());

app.use("/auth", authRouter); //register and login route

app.use("/dashboard", dashboardRouter); //dashboard route



app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
});