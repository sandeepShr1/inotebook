import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNote } = context;

    useEffect(() => {
        getNote()
    }, [])
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h3>Your notes</h3>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;
