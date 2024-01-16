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
                await collection.updateOne({ _id: user._id }, { $set: { authentication: true } });

                req.session.user = {
                    id: user._id,
                    username: user.username
                };
                console.log('User authenticated:', req.session.user);
                res.json("match");
            } else {
                console.log('Wrong password');
                res.json("wrongpassword");
            }
        } else {
            console.log('User not found');
            res.json("notexist");
        }
    } catch (e) {
        console.error('Error during authentication:', e);
        res.json("error");
    }
});


app.post("/signup", async(req, res) => {
    const { username, password } = req.body;

    try {
        const check = await collection.findOne({ username: username });
        if (check) {
            res.json("alreadyexist");
        } else {
            const data = {
                username: username,
                password: password,
                authentication: true,
            };
            await collection.insertMany([data]);
            req.session.user = {
                id: data._id,
                username: data.username,
            };
            res.json("signupsuccess");
        }
    } catch (e) {
        console.error('Error during sign up:', e);
        res.json("error");
    }
});

app.post("/createflashcardset", async (req, res) => {
    e.preventDefault()
    try {
        const user = await collection.findOne({ authentication: true });
        if (user) {
            const newFlashcardSet = { flashcardSetsSchema: [] };
            await collection.updateOne(
                { _id: user._id },
                { $push: { setsFlashcards: newFlashcardSet } }
            );
            res.json("flashcardsetcreated");
        } else {
            res.json("notauthenticated");
        }
    } catch (error) {
        console.error('error creating flashcard set:', error);
        res.json("error");
    }
});



app.post("/createcard", async (req, res) => {
    try {
        const data = {
            user,
            question,
            answer,
        }
        const user = await collection.findOne({ authentication: true });
        console.log(collection.setsFlashcards)
        await collection.setsFlashcards.insertMany([data]);

    } catch (error){
        console.log("error")
    }
});




app.get("/checkauth", async (req, res) => {
    try {
        if (req.session.user) {
            res.json("authenticated");
        } else {
            const user = await collection.findOne({ username: req.body.username });
            if (user) {
                req.session.user = {
                    id: user._id,
                    username: user.username
                };
                console.log('User authenticated:', req.session.user);
                res.json("authenticated");
            } else {
                res.json("notauthenticated");
            }
        }
    } catch (error) {
        console.error('Error during authentication check:', error);
        res.json("error");
    }
});


app.post("/signout", async (req, res) => {
    try {
        const user = await collection.findOne({ authentication: true });

        if (user) {
            await collection.updateOne({ _id: user._id }, { $set: { authentication: false } });
            req.session.destroy();
            res.json("signedout");
        } else {
            res.json("usernotfound");
        }
    } catch (error) {
        console.error('Error during sign out:', error);
        res.json("error");
    }
});


app.listen(3001,() =>{
    console.log("Listening on port 3001")
});