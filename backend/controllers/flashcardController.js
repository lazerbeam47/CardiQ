const Flashcard=require("../models/Flashcard")


//gets all flashcards
const getFlashcardsByUploadId = async (req, res) => {
    try {
        const flashcards = await Flashcard.find({ uploadId: req.params.uploadId });
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//create flashcards

const createFlashcard=async(req,res)=>{
    const {question,answer,uploadId}=req.body;
    try{
        const newflashcard=await Flashcard.create({question,answer,uploadId})
        res.status(200).json(newflashcard);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
};

//delete flashcard

const deleteFlashcard=async(req,res)=>{
    try{
        await Flashcard.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Flashcard deleted"})
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
};

module.exports={getFlashcardsByUploadId,createFlashcard,deleteFlashcard};