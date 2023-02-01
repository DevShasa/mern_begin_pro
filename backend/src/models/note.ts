import mongoose, { InferSchemaType, Schema, model } from "mongoose"

const document_id = mongoose.Schema.Types.ObjectId

const notesSchema = new Schema({
    title:{type:String, required:true, maxLength: 30},
    text:{type:String},
    note_code:{type:Number, required:true},
    note_status:{
        type:String,
        enum:["DONE", "NOTDONE"],
        required: true
    },
    random_note_id:{
        type: document_id,
        required: true
    }
}, {timestamps: true})

type Note  = InferSchemaType<typeof notesSchema>;

export default model<Note>("Note", notesSchema)