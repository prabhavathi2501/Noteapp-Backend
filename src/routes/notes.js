import express from "express"
import Auth from "../common/auth.js"
import NotesController from "../controller/notes.js"
const router=express.Router();

// router.get('/',(req,res)=>{
//     res.status(200).send(`<h1>app is listen index  users space</h1>`)
// })


router.post('/create',NotesController.createNotes);
router.get('/getallnotes',NotesController.getAllNotes);
router.get('/:id',NotesController.getNotesById);
router.put('/edit/:id',NotesController.editNotes);
router.put('/status/:id',NotesController.setComplete)
router.delete('/:id',NotesController.deleteNote);
router.get('/search',NotesController.searchNotes)
// router.post('/login',UserController.login)

export default router