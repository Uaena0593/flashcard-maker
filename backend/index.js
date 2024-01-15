import mongoose from 'mongoose';
import express from 'express';
import session from "express-session"
import bodyParser from 'body-parser';
import cors from 'cors';
import collection from "./database.js"
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())

app.use(session({
    secret: 'harharhar',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const PORT = process.env.PORT || 3001;

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    if (req.session.user) {
        res.json("alreadyauthenticated");
        return;
    }

    try {
        const user = await collection.findOne({ username: username });

        if (user) {
            if (user.password === password) {
                req.session.user = {
                    id: user._id,
                    username: user.username
                };
                res.json("match");
            } else {
                res.json("wrongpassword");
            }
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("error");
    }
});

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

app.get("/checkauth", (req, res) => {
    console.log('harharhar')
    if (req.session.user) {
        res.json("authenticated");
    } else {
        res.json("notauthenticated");
    }
});

app.post("/signout", (req, res) => {
    req.session.destroy();
    res.json("signedout");
});

app.listen(3001,() =>{
    console.log("Listening on port 3001")
});