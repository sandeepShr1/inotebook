import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    // Add a note
    const addNote = async (title, description, tag) => {

        // API call
        const url = `${host}/api/notes/addnotes`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Get all notes
    const getNotes = async () => {

        // API call
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json)
    }


    // Delete a note
    const deleteNote = async (id) => {
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // logic to edit 
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;