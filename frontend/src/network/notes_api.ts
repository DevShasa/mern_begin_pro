import { NoteModel } from "../models/note";

async function fetchData(input:RequestInfo, init?:RequestInit){
    const response =  await fetch(input, init)
    if(response.ok){
        // kila kitu iko sawa
        return response;
    }else{
        // errors come back as a json body
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage)
    }
}

export async function fetchNotes():Promise<NoteModel[]>{
    //const response = await fetchData("http://localhost:5000/api/notes", {method: "GET"}); -> for when the server has cors
    // we using a proxy so browser does not know request is going to diffeent server
    const response = await fetchData("/api/notes", {method: "GET"}); 
    console.log("SERVER RESPONSE",response)
    return response.json() // this is a promise as opposed to   const notes = await response.json();
}

export interface NoteInput{
    title:string,
    text?:string,
}

export async function createNote(note: NoteInput):Promise<NoteModel>{
    const data = {...note, note_status:"NOTDONE"}
    const response = await fetchData("api/notes",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    })

    return response.json() // Eextract json body from argument and return is as an object
}

export async function deleteNote(noteId:string) {
    await fetchData("api/notes/" +noteId, {
        method:"DELETE"
    });
}

export async function updateNote(noteId:string, note:NoteInput):Promise<NoteModel>{
    const data = {...note, note_status:"NOTDONE"}
    const response = await fetchData("api/notes/"+noteId,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),

    })

    return response.json();
}