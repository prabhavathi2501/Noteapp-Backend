import express from "express"
import UserController from "../controller/User.js"
const router=express.Router();

// router.get('/',(req,res)=>{
//     res.status(200).send(`<h1>app is listen index  users space</h1>`)
// })


router.post('/signup',UserController.create);
router.post('/login',UserController.login)

export default router