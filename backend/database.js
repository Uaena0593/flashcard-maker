import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://chenleejonathan:GGVwEludYHJ6LiND@cluster0.fmwhr6o.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log('failed');
})

const flashcardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const flashcardSetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    flashcards: [flashcardSchema]
});

const newSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    authentication: {
        type: Boolean,
        default: false
    },
    setsFlashcards: [flashcardSetSchema]
});


const collection = mongoose.model("collection", newSchema)


export default collection