import express from "express";
import db from "../db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js"; 
import validInfo from "../middleware/validInfo.js";
import authorization from "../middleware/authorization.js";


const router = express.Router(); // is a method provided by the Express.js framework itself. It is designed to help with organizing and managing routes in an Express application.

router.post("/register", validInfo, async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const user = await db.query("select * from users where user_email =$1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists");
        }
        else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const bcryptPassword = await bcrypt.hash(password, salt);

            const newUser = await db.query("insert into users (user_name, user_email, user_password) VALUES($1,$2,$3) RETURNING *", [name, email, bcryptPassword]);

            const token = jwtGenerator(newUser.rows[0].user_id)
            res.json({ token });
        }



    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")

    }
});

router.post("/login",validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.query("select * from users where user_email=$1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("User is not registered")
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password); //return boolean value
        

        if (!validPassword) {
            return res.status(401).json("Email or Password is incorrect")
        }

        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verify", authorization, async (req,res) =>
{
    try {
            res.json(true);
    } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
    }
});

export default router;