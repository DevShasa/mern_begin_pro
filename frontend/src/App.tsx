import { useState, useEffect } from "react";
import { NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import utilStyles from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa"

function App() {

  const [ notes, setNotes ] = useState<NoteModel[]>([])
  const [ showAddNotesDialog, setShowAddNotesDialog ] = useState(false)

  useEffect(()=>{
    async function loadNotes(){
      try{
        const notes = await NotesApi.fetchNotes();
        setNotes(notes)
      }catch(error){
        console.log("COULD NOT FETCH NOTES--->",error)
        alert(error)
      }

    }

    loadNotes();

  },[])

  async function deleteNote(note:NoteModel){
    try{
      await NotesApi.deleteNote(note._id)
      // filter out the deleted note
      setNotes(notes.filter((n)=>n._id !== note._id))
    }catch(error){
      console.log(error)
      alert(error)
    }
  }

  return (
    <Container>
      <Button onClick={()=> setShowAddNotesDialog(true)} className={`mb-2 mt-2 ${utilStyles.blockCenter} ${utilStyles.flexCenter}`}>
        <FaPlus />
        Add new Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-3">
      {notes.length !== 0 && (
          notes.map((n)=>{
            return(
              <Col key={n._id}>
                <Note  note={n} className={styles.note} onDeleteNoteClicked={deleteNote}/>
              </Col> 
            )
          })
        )}
      </Row>
      { showAddNotesDialog && (
        <AddEditNoteDialog 
          onDismiss={()=> setShowAddNotesDialog(false)}

          onNoteSaved = {(newNote)=>{
            setShowAddNotesDialog(false)
            setNotes([...notes,newNote])
          }}
        />
      )}  
    </Container>
  )
}

export default App
