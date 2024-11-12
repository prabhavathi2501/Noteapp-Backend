import mongoose from "./index.js"

const notesSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title is Required"] },
    notes:{ type: String, required: [true, "notes is Required"] },
    createdAt: { type: Date, default: Date.now() },
    email:{type:String},
    reminder:{ type: Date },
    createdBy:{type:String,},
    status:{type:Boolean,default:true},
},{
    versionKey:false,
})

const notesModel = mongoose.model("notes",notesSchema)
export default notesModel