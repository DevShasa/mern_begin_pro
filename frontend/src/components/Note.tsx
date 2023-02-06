import { NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import utilStyles from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate";
import {MdDelete} from "react-icons/md"

interface NoteProps{
    note: NoteModel,
    className?: string,
    onDeleteNoteClicked: (note:NoteModel) => void,
    onNoteClicked : ()
}



const Note = ({note, className, onDeleteNoteClicked}:NoteProps) =>{

    const { title, text, createdAt, updatedAt } = note

    const timeStamp:string = updatedAt > createdAt  
                                ? `Updated: ${formatDate(updatedAt)}`
                                : `Created: ${formatDate(createdAt)}`

    return(
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={utilStyles.flexCenter}>
                    {title}
                    <MdDelete 
                        className="text-muted ms-auto"
                        onClick = {(e)=>{
                            onDeleteNoteClicked(note)
                            e.stopPropagation();
                        }}    
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {timeStamp}
            </Card.Footer>
        </Card>
    )
}

export default Note

