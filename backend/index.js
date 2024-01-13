import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import collection from "./database.js"
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())
const PORT = process.env.PORT || 3001;

app.post("/signin", async(req,res) =>{
    const{ username,password } = req.body
    try{
        const check = await collection.findOne({ username:username})

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
        }
    }
    catch(e) {
        res.json("notexist")
    }
})

app.post("/signup", async(req,res) =>{
    const{ username,password } = req.body
    const data = {
        username:username,
        password:password,
    }
    try{
        const check = await collection.findOne({ username:username })

        if (check) {
            res.json("alreadyexist")
        }
        else {
            res.json("notexist")
            await collection.insertMany([data])
        }
    }
    catch(e) {
        res.json("notexist")
    }
})

app.listen(3001,() =>{
    console.log("Listening on port 3001")
})