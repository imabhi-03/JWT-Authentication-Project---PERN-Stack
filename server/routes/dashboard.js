import express from "express";
import authorization from "../middleware/authorization.js";
import db from "../db.js";

const router=express.Router();

router.get("/" , authorization, async(req,res)=>
{
    try {
            const user =await db.query("Select * from users where user_id=$1",[req.user]);
            res.json(user.rows[0]);
    } catch (err) {
                    console.error(err.message);
                    res.status(500).json("Server Error");
    }
})

export default router;