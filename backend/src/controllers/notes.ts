import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../../src/models/note";

export const getNotes:RequestHandler = async (req, res, next)=>{
    try{
        //throw createHttpError(401, "This is an example error");
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes)
    }catch(error){
        next(error);
    }
}

export const getNote:RequestHandler = async(req, res, next)=>{
    const noteId = req.params.noteId;
    try{
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec()
        if(!note){
            // if there is no note
            throw createHttpError(404, "Note not found")
        }
        res.status(200).json(note)
    }catch(error){
        next(error);
    }
}

interface createNoteBody{
    title?:string,
    text?:string,
    note_status?:string,
    // note_code?:number,
    // random_note_id?:string
}
export const createNote: RequestHandler<unknown, unknown, createNoteBody, unknown> = async(req, res, next)=>{
    const title = req.body.title;
    const text = req.body.text;
    const note_status = req.body.note_status
    // const note_code = req.body.note_code
    // const random_note_id = req.body.random_note_id
    try{

        if(!title){
            throw createHttpError(400, "Note must have a title")
        }
        if(!note_status){
            throw createHttpError(400, "Note must have status of DONE or NOTDONE")
        }
        const newNote = await NoteModel.create({
            title: title,
            text: text,
            note_status:note_status,
            // note_code:note_code,
            // random_note_id:random_note_id
        });

        res.status(201).json(newNote)
    }catch(error){
        next(error)
    }
}

interface UpdateNoteParams{
    noteId:string,
}
interface UpdateNoteBody{
    title?:string,
    text?:string,
    note_status?:string,
}
export const updateNote:RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next)=>{
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const newStatus = req.body.note_status;
    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note id");
        }
        if(!newTitle){
            throw createHttpError(400, "Note must have a title")
        }
        if(!newStatus){
            throw createHttpError(400, "Note must have status of DONE or NOTDONE")
        }

        const note = await NoteModel.findById(noteId).exec()

        if(!note){
            // if there is no note
            throw createHttpError(404, "Note not found")
        }


        note.title = newTitle;
        note.text = newText;
        note.note_status = newStatus as typeof note.note_status

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);

    } catch (error) {
        next(error)
    }
}

export const deleteNote:RequestHandler = async(req, res, next) =>{
    const noteId = req.params.noteId
    try{
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec()
        if(!note){
            throw createHttpError(404, "Note not found")
        }

        await note.remove();

        res.sendStatus(204) // deletion successful

    }catch(error){
        next(error)
    }
}