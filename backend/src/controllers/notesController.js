import Note from "../models/Notes.js";


export async function getAllNotes (req,res){
    try {
         const  notes = await Note.find()
         console.log('Sending Notes');
         res.status(200).json(notes)
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
        console.error(error);
        
    }
    
}

export async function createNode(req,res){
    try{
        const {title,content} = req.body;
        console.log(req)
        console.log(req.body)
        const newNote = new Note({title,content});
        // const newNote = new Note(req.body); 
        console.log("Added Note");
        const savedNote = await newNote.save(); 
        if (!savedNote) return res.status(404).json({message:"Message Not Found"})
        res.status(201).json(savedNote); 

    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
        const {title,content} = req.body;
        console.log(title,content)
    }
    
}
export async function updateNode(req,res){
    try{
    const {title,content} = req.body;
    const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content});
    
    if (!updateNote) return res.status(404).json({message:"Note not found"});
    res.status(200).json(updateNote);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
    
}
export async function deleteNode(req,res){
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if (!deleteNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export async function getNote(req,res){
    try {
    const singleNote = await Note.findById(req.params.id);
    if (!singleNote) return res.status(404).json({message:"Note not found"});
    res.status(200).json(singleNote);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
        
    }
}