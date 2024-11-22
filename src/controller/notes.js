import notesModel from "../models/notes.js"
import Auth from "../common/auth.js"
import userModel from "../models/User.js";


const createNotes = async (req,res)=>{
    try {
        const { title, notes, reminder } = req.body;
       
    
        if (title && notes && reminder) {
          await notesModel.create({
            title,
            notes,
            reminder,
            // email,
            createdBy: req.headers.userId
          });
    
          res.status(201).send({
            messasge: "Notes created successfully",
          });
        } else {
          res.status(400).send({
            messasge: "title,notes,reminder required",
          });
        }
      } catch (error) {
        res.status(500).send({
          messasge: "Internal server Error",
          error: error.messasge,
        });
      }
    };
    
    const getAllNotes = async(req, res) => {
      try {
        let allNotes = await notesModel
          .find(
            {},
            { _id: 1, title: 1, notes: 1, reminder: 1, createdAt: 1, status: 1 }
          )
          .sort({ createdAt: 1 });
        res.status(200).send({
          messasge: "Notes fetched successfully",
          allNotes,
        });
      } catch (error) {
        res.status(500).send({
          messasge: "Internal server Error",
          error: error.messasge,
        });
      }
    };

const getNotesById = async(req,res)=>{
    try {
        const notesId=  req.params.id
        if(notesId){
            let notes=await notesModel.findById(req.params.id)
            res.status(200).send({
                messasge:"notes get fectched",
               
                notes
            })

        }
        else{
            res.status(400).send({message:"Notes Id Not found"})
        }
        
    } catch (error) {
        res.status(500).send({
            messasge:"Intenal sever ereor",
            error:error.messasge
        });
        
    }


}



const editNotes=async(req,res)=>{
    try {
        const notesId=req.params.id
        if(notesId){
            const{title,notes,reminder}=req.body
            let editnotes=await notesModel.findById(notesId)
            editnotes.title=title,
            editnotes.notes=notes,
            editnotes.reminder=reminder,
            editnotes.modifiedAt=Date.now()
            
            await editnotes.save()
            res.status(200).send({
                message:"notes Edited Successfully"
            })

        }
        else{
            res.status(400).send({message:"Notes edited Not found"})

        }
        
    } catch (error) {
        res.status(500).send({
            message:"internal sever error",
            error:error.message
        })
        
    }

}


const deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("dlete id--?", id);
        await notesModel.find(id).then((res)=>{
          console.log(res)
        })
     
      // if (!result) {
      //   return res.status(400).json({ message: "Note not found" });
      // } else {
      //   return res.status(200).json({ message: " Deleted Success" });
      // }
      console.log("message")
    } catch (error) {
      res.status(500).send({
        messasge: "Internal server Error",
        error: error.messasge,
      });
    }
  };


  const setComplete = async(req,res) => {
    try {
      let notesId = req.params.id;
      console.log("notesId--->", notesId);
      if (notesId) {
      const { status } = req.body;
        console.log("status", status);
        let resNotes = await notesModel.findOne({ _id: req.params.id });
        (resNotes.status = true)
        // (resNotes.reminder=null)
        await resNotes.save();
        console.log("resNotes-->", resNotes);
        res.status(200).send({
          messasge: "notes updated successfully",
        });
      } else {
        res.status(400).send({ messasge: "notesId not found" });
  }
  } catch (error) {
    res.status(500).send({
      messasge: "Internal server Error",
      error: error.messasge,
    });
  }
  }


    export default {
        createNotes,
        getAllNotes,
        getNotesById,
        editNotes,
        deleteNote,
        setComplete
    }