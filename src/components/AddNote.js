import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/NoteContext';


const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag:""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag:""})
        props.showAlert("Note added successfully", "success")
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className="container">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value ={note.title} id="title" name="title" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" value ={note.description} onChange={onChange} name="description" id="description" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control"  value ={note.tag}onChange={onChange} name="tag" id="tag" minLength={5} required />
                </div>
                <button disabled= {note.title.length<5 || note.description.length<5 || note.tag.length<3 } type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;
