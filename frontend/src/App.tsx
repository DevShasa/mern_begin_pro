import { useState, useEffect } from "react"
import { Note } from "./models/note"

function App() {

  const [ notes, setNotes ] = useState<Note[]>([])

  useEffect(()=>{
    async function loadNotes(){
      try{
        //const response = await fetch("http://localhost:5000/api/notes", {method: "GET"}); -> for when the browser has cors
        const response = await fetch("/api/notes", {method: "GET"});
        console.log(response)
        // get the json body from the response and put it in notes
        const notes = await response.json();
        console.log("NOTES",notes) 
        setNotes(notes)
      }catch(error){
        console.log("COULD NOT FETCH NOTES",error)
      }

    }

    loadNotes();

  },[])

  return (
    <div className="App">
        {JSON.stringify(notes)}
    </div>
  )
}

export default App
