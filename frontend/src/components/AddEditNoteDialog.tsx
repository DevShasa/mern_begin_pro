import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { NoteModel } from '../models/note';
import { NoteInput } from '../network/notes_api';
import { useForm } from "react-hook-form";
import * as NotesApi from "../network/notes_api"

interface AddEditNoteDialogProps{
    noteToEdit?:NoteModel,
    onDismiss: ()=> void,
    onNoteSaved: (note: NoteModel) => void, // Function called when a note is successfuly saved
}

const AddEditNoteDialog = ({noteToEdit, onDismiss, onNoteSaved}:AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState:{errors, isSubmitting} } = useForm<NoteInput>({
        defaultValues:{
            title:noteToEdit?.title || "",
            text:noteToEdit?.text || ""
        }
    })
    async function onNoteFormSubmit(input:NoteInput){
        try{

            let noteResponse:NoteModel;
            if(noteToEdit){
                // we are editing a note 
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
            }else{
                noteResponse = await NotesApi.createNote(input)
            }
            onNoteSaved(noteResponse)
        }catch(error){
            console.error(error)
            alert(error)
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onNoteFormSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder = "Note Title"
                            isInvalid={!!errors.title}
                            {...register("title", {required:"Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={5}
                            placeholder = "Note Text"
                            {...register("text")}

                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    type="submit"
                    form="addEditNoteForm"
                    disabled = {isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEditNoteDialog