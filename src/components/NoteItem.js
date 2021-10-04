import React, {useContext} from 'react';
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-2" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, labore! Minima corporis dolorum reprehenderit at provident nesciunt ducimus magni ratione ex. Repellendus blanditiis eveniet velit? Neque, rem. Debitis, dignissimos nostrum.</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fas fa-trash mx-2" onClick ={() => {deleteNote(note._id)}} ></i>
                    <i className="fas fa-user-edit mx-2"></i>

                </div>
            </div>
        </div>
    )
}

export default NoteItem;
