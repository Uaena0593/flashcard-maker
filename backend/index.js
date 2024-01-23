require("dotenv").config()
import mongoose from 'mongoose';
import express from 'express';
import session from "express-session"
import bodyParser from 'body-parser';
import cors from 'cors';
import collection from "./database.js"
import converterAPI from './cohereapi.js';

const dbConnectionString = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors(
    {    
        origin : ["https://deploy-mern-1whq.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
))

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
    const { username, password, confirmPassword } = req.body;

    try {
        const check = await collection.findOne({ username: username });
        if (check) {
            res.json("alreadyexist");
        } else if (password != confirmPassword) {
            res.json('')
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

app.get("/createflashcards/:id", async (req, res) => {
    const flashcardSetId = req.params.id;
    try {
      const user = await collection.findOne({ "setsFlashcards._id": flashcardSetId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const flashcardSet = user.setsFlashcards.find(set => set._id.toString() === flashcardSetId);
      if (!flashcardSet) {
        return res.status(404).json({ error: 'Flashcard set not found' });
      }
      res.json({ name: flashcardSet.name });
    } catch (error) {
      console.error('Error fetching flashcard set title:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.put("/updateflashcardset/:id", async (req, res) => {
    const flashcardSetId = req.params.id;
    const { name } = req.body;
    try {
        const user = await collection.findOne({ "setsFlashcards._id": flashcardSetId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const flashcardSet = user.setsFlashcards.find(set => set._id.toString() === flashcardSetId);

        await collection.findOneAndUpdate(
            { "setsFlashcards._id": flashcardSetId },
            { $set: { "setsFlashcards.$.name": name } },
            { returnDocument: 'after' }
        );
        if (!flashcardSet) {
            return res.status(404).json({ error: 'Flashcard set not found' });
        }
        res.json({ message: 'Flashcard set title updated successfully' });
    } catch (error) {
        console.error('Error updating flashcard set title:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/returnflashcardsets", async (req, res) => {
    try{
        const user = await collection.findOne({ authentication: true });
        if (user) {
            const flashcardSets = user.setsFlashcards;
            res.json({ flashcardSets });
        }
    } catch (error) {
        console.log(error)
    }
})

app.get("/deleteflashcardset/:id", async (req, res) => {
    try {
        const flashcardSetId = req.params.id;

        const user = await collection.findOneAndUpdate(
            { "setsFlashcards._id": flashcardSetId },
            { $pull: { setsFlashcards: { _id: flashcardSetId } } },
            { new: true }
        );

        if (user) {
            console.log("Flashcard set deleted:", flashcardSetId);
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Flashcard set not found or unable to delete." });
        }
    } catch (error) {
        console.error('Error deleting flashcard set:', error);
        res.json({ success: false, message: "Error deleting flashcard set." });
    }
});

app.post("/createflashcardset", async (req, res) => {
    try {
        const user = await collection.findOneAndUpdate(
            { authentication: true },
            {
                $push: {
                    setsFlashcards: { name: "untitled", flashcards: [] }
                }
            },
            { new: true }
        );

        if (user) {
            const index = user.setsFlashcards.length - 1;
            const insertedId = user.setsFlashcards[index]._id;

            console.log("Flashcard set created:", insertedId);
            res.json(insertedId);
        } else {
            res.json("notauthenticated");
        }
    } catch (error) {
        console.error('Error creating flashcard set:', error);
        res.json("error");
    }
});



app.post("/createflashcard/:id", async (req, res) => {
const flashcardSetId = req.params.id;
const { question, answer } = req.body;

try {
    const user = await collection.findOne({ "setsFlashcards._id": flashcardSetId });
    if (question == "" || answer == ""){
        res.json("no match")
    }
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const flashcardSetIndex = user.setsFlashcards.findIndex(set => set._id.toString() === flashcardSetId);

    if (flashcardSetIndex === -1) {
        return res.status(404).json({ error: 'Flashcard set not found' });
    }
    user.setsFlashcards[flashcardSetIndex].flashcards.push({ question, answer });
    const updatedUser = await user.save();

    res.json({ message: 'Flashcard created successfully', updatedUser });
} catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

app.get("/useflashcards/:id", async (req, res) => {
    const flashcardSetId = req.params.id;
    try {
        const user = await collection.findOne({ "setsFlashcards._id": flashcardSetId });
        const flashcardSet = user.setsFlashcards.find(set => set._id.toString() === flashcardSetId);
        const flashcards = flashcardSet.flashcards
        res.json({flashcards})
    } catch (error) {
        console.log(error)
    }
})


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

app.post("/cardConverter", async (req, res) => {
    try {
        const { input } = req.body;
        const inputArray = input.split('.').filter(str => str.trim() !== '');
        await converterAPI(inputArray, res);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
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
    console.log("Listening on port 3001");
});