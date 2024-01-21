import mongoose from 'mongoose';
import express from 'express';
import session from "express-session"
import bodyParser from 'body-parser';
import cors from 'cors';
import collection from "./database.js"
import { CohereClient } from "cohere-ai"

const cohere = new CohereClient({
    token: "bisFU3xxdGNMKdtG9PLFa58hODnaNUhdH4iXdJbZ",
});

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

app.post("/createflashcardset", async (req, res) => {
    try {   
      const user = await collection.findOne({ authentication: true });
      if (user) {
        const newFlashcardSet = { name: "untitled", flashcards: [] };
        const result = await collection.updateOne(
            { _id: user._id },
            { $push: { setsFlashcards: newFlashcardSet } }
          );
      const index = user.setsFlashcards.length - 1;

      const insertedId = user.setsFlashcards[index]._id;

      res.json(insertedId)
      } else {
        res.json("notauthenticated");
      }
    } catch (error) {
      console.error('error creating flashcard set:', error);
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
    const { input } = req.body
    const inputArray = input.split('.').filter(str => str.trim() !== '');
    console.log(inputArray)
    console.log('poggers')
    try {
         (async () => {
            const classify = await cohere.classify({
                examples: [
                    { text: "Negative Identity: Selection of an identity that is undesirable in the eyes of significant others and the broader community.", label: "definition" },
                    { text: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments.", label: "definition" },
                    { text: "The Earth rotates on its axis, completing one full rotation approximately every 24 hours.", label: "definition" },
                    { text: "Mount Everest is the highest peak in the world, reaching an elevation of 29,032 feet (8,848 meters) above sea level.", label: "definition" },
                    { text: "Rivers are natural watercourses, typically having a source, a course, and a mouth, where they flow into another body of water.", label: "definition" },
                    { text: "Gravity is the force that attracts two objects with mass toward each other, giving weight to physical objects.", label: "definition" },
                    { text: "The Mona Lisa is a famous portrait painting by Leonardo da Vinci, known for its enigmatic smile.", label: "definition" },
                    { text: "Eclipses occur when one celestial body moves into the shadow of another, like a solar eclipse where the Moon blocks the Sun.", label: "definition" },
                    { text: "In literature, irony is a rhetorical device or figure of speech in which the intended meaning of words is opposite to their literal or usual meaning.", label: "definition" },
                    { text: "Photosynthesis happens at a cellular level in plant cells, involving complex biochemical processes.", label: "definition" },
                    { text: "Elephants are the largest land animals, characterized by their long trunks, large ears, and tusks.", label: "definition" },
                    { text: "The cat sat on the mat, purring contentedly.", label: "not definition" },
                    { text: "John likes to take long walks in the evening to relax.", label: "not definition" },
                    { text: "Chocolate chip cookies are a popular treat enjoyed by people of all ages.", label: "not definition" },
                    { text: "The weekend is a time for leisure and spending time with family and friends.", label: "not definition" },
                    { text: "Mountains are majestic formations that inspire awe and wonder in those who behold them.", label: "not definition" },
                    { text: "The color blue is often associated with calmness and tranquility.", label: "not definition" },
                    { text: "Listening to music can have a profound impact on one's mood and emotions.", label: "not definition" },
                    { text: "Learning a new language broadens one's understanding of different cultures.", label: "not definition" },
                    { text: "The feeling of sand between your toes on a sunny beach day is pure bliss.", label: "not definition" },
                    { text: "Time management is a skill that can greatly contribute to personal and professional success.", label: "not definition" },
                    { text: "Gravity pulls objects towards the center of the Earth, keeping them anchored to its surface.", label: "definition" },
                    { text: "The concept of democracy involves a system of government where citizens participate in decision-making through voting.", label: "definition" },
                    { text: "The moonlight shimmered on the calm surface of the lake, creating a serene atmosphere.", label: "not definition" },
                    { text: "Swimming is a popular recreational activity that involves moving through water using various strokes.", label: "definition" },
                    { text: "The joy of laughter is contagious, often bringing people together in moments of happiness.", label: "not definition" },
                    { text: "In computer programming, algorithms are step-by-step procedures for solving problems or performing tasks.", label: "definition" },
                    { text: "The aroma of freshly baked bread wafted through the air, tempting everyone in the vicinity.", label: "not definition" },
                    { text: "The concept of time travel, as depicted in science fiction, explores the possibility of moving between different points in time.", label: "definition" },
                    { text: "Cats are known for their independent nature, often choosing solitude over constant companionship.", label: "not definition" },
                    { text: "Cellular respiration is a biological process that releases energy from organic compounds in cells.", label: "definition" },
    
                    { text: "Jogging in the park is a great way to stay active and improve cardiovascular health.", label: "not definition" },
                    { text: "The principle of supply and demand is a fundamental concept in economics that influences prices in a market.", label: "definition" },
                    { text: "Sunsets paint the sky with vibrant hues, creating a breathtaking visual display.", label: "not definition" },
                    { text: "The concept of justice involves fairness and the equitable treatment of individuals within a society.", label: "definition" },
                    { text: "Playing musical instruments can be a fulfilling hobby that allows individuals to express themselves creatively.", label: "not definition" },
                    { text: "Mitosis is a cellular process in which a single cell divides into two identical daughter cells.", label: "definition" },
                    { text: "Hiking through the dense forest, the explorer marveled at the diverse flora and fauna.", label: "not definition" },
                    { text: "The Golden Gate Bridge is an iconic landmark in San Francisco, known for its majestic architecture.", label: "definition" },
                    { text: "Rainbows are optical and meteorological phenomena that result from the refraction, dispersion, and reflection of light.", label: "definition" },
                    { text: "The scent of lavender is often associated with relaxation and is used in aromatherapy.", label: "not definition" },
    
                    { text: "Renewable energy sources, such as solar and wind power, aim to reduce dependence on non-renewable fossil fuels.", label: "definition" },
                    { text: "The feeling of sand between your toes and the sound of waves crashing create a perfect beach experience.", label: "not definition" },
                    { text: "The concept of biodiversity refers to the variety of life on Earth, including different species and ecosystems.", label: "definition" },
                    { text: "Learning a new language opens doors to different cultures and enhances communication.", label: "not definition" },
                    { text: "Evolution is the process of gradual changes in living organisms over long periods, leading to the diversity of life.", label: "definition" },
                    { text: "The art of storytelling has been an integral part of human culture, passing down knowledge and traditions.", label: "not definition" },
                    { text: "The Great Wall of China is a historical marvel, stretching across thousands of miles with a rich cultural significance.", label: "definition" },
                    { text: "In psychology, cognitive dissonance refers to the discomfort from holding conflicting beliefs or attitudes.", label: "definition" },
                    { text: "Cycling through scenic landscapes can be both a recreational activity and an environmentally friendly mode of transportation.", label: "not definition" },
                    { text: "Plate tectonics is a geological theory explaining the movement and interaction of Earth's lithospheric plates.", label: "definition" },
                    { text: "The taste of ripe strawberries on a summer day is a delightful and refreshing experience.", label: "not definition" },
                    { text: "The concept of equality advocates for fair treatment and opportunities for all individuals, irrespective of differences.", label: "definition" },
                    { text: "Sailing across the calm waters, the sailor enjoyed the tranquility of the open sea.", label: "not definition" },
                    { text: "The concept of climate change involves long-term shifts in global or regional weather patterns.", label: "definition" },
                    { text: "Negative Identity: Selection of an identity that is undesirable in the eyes of significant others and the broader community.", label: "definition" },
                    { text: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments.", label: "definition" },
                    { text: "The Earth rotates on its axis, completing one full rotation approximately every 24 hours.", label: "definition" },
                    { text: "Mount Everest is the highest peak in the world, reaching an elevation of 29,032 feet (8,848 meters) above sea level.", label: "definition" },
                    { text: "Rivers are natural watercourses, typically having a source, a course, and a mouth, where they flow into another body of water.", label: "definition" },
                    { text: "Gravity is the force that attracts two objects with mass toward each other, giving weight to physical objects.", label: "definition" },
                    { text: "The Mona Lisa is a famous portrait painting by Leonardo da Vinci, known for its enigmatic smile.", label: "definition" },
                    { text: "Eclipses occur when one celestial body moves into the shadow of another, like a solar eclipse where the Moon blocks the Sun.", label: "definition" },
                    { text: "In literature, irony is a rhetorical device or figure of speech in which the intended meaning of words is opposite to their literal or usual meaning.", label: "definition" },
                    { text: "Photosynthesis happens at a cellular level in plant cells, involving complex biochemical processes.", label: "definition" },
                    { text: "Elephants are the largest land animals, characterized by their long trunks, large ears, and tusks.", label: "definition" },
    
                    { text: "The cat sat on the mat, purring contentedly.", label: "not definition" },
                    { text: "John likes to take long walks in the evening to relax.", label: "not definition" },
                    { text: "Chocolate chip cookies are a popular treat enjoyed by people of all ages.", label: "not definition" },
                    { text: "The weekend is a time for leisure and spending time with family and friends.", label: "not definition" },
                    { text: "Mountains are majestic formations that inspire awe and wonder in those who behold them.", label: "not definition" },
                    { text: "The color blue is often associated with calmness and tranquility.", label: "not definition" },
                    { text: "Listening to music can have a profound impact on one's mood and emotions.", label: "not definition" },
                    { text: "Learning a new language broadens one's understanding of different cultures.", label: "not definition" },
                    { text: "The feeling of sand between your toes on a sunny beach day is pure bliss.", label: "not definition" },
                    { text: "Time management is a skill that can greatly contribute to personal and professional success.", label: "not definition" },
                ],
                    inputs: inputArray,
            })
            console.log(classify.classifications)
            const classifyArray = classify.classifications
            const newArray = [];
            console.log(classifyArray)
            classifyArray.forEach(item => {
                console.log(item.prediction)
                if (item.prediction === "definition"){
                    const delimiters = /is|are|:/;
                    const dissectedArray = item.input.split(delimiters).filter(str => str.trim() !== '');
                    console.log(dissectedArray);
                    const dissected = { front : dissectedArray[0], back : dissectedArray.slice(1).join(' ')};
                    newArray.push(dissected)
                }
            });
            res.json(newArray)
            console.log(newArray)
        })();
     } catch (error) {
         console.log(error) 

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