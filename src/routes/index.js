import express from "express"
import UserRouter from "./User.js"
import NotesRouter from "./notes.js"


const router=express.Router();

router.get('/',(req,res)=>{
    res.status(200).send(`<h1>app is listen index space</h1>`)
})
router.use('/user',UserRouter);
router.use('/notes',NotesRouter)

export default router