import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/flashcard-maker-signin")
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
    flashcardSetsSchema : [flashcardSchema]
})
const newSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    authentication : {
        type : Boolean,
        default: false
    },
    setsFlashcards: [flashcardSetSchema]
})


const collection = mongoose.model("collection", newSchema)


export default collection