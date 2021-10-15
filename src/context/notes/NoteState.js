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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MzJiYmQ1MzI2YjhiYTAyMDZmMzIxIn0sImlhdCI6MTYzMjk5NzQzM30.8i9zM74Lkzix7A81q3lcxb5li1LP4PTlsuDtS_dV6mM"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        console.log("adding new note")
        const note = {
            "_id": "6157fadd46dbbbb5b0a42f44",
            "user": "61532bbd5326b8ba0206f321",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-10-02T06:23:25.489Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // Get all notes
    const getNotes = async () => {

        // API call
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MzJiYmQ1MzI2YjhiYTAyMDZmMzIxIn0sImlhdCI6MTYzMjk5NzQzM30.8i9zM74Lkzix7A81q3lcxb5li1LP4PTlsuDtS_dV6mM"
            },
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)
    }


    // Delete a note
    const deleteNote = async (id) => {
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MzJiYmQ1MzI2YjhiYTAyMDZmMzIxIn0sImlhdCI6MTYzMjk5NzQzM30.8i9zM74Lkzix7A81q3lcxb5li1LP4PTlsuDtS_dV6mM"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MzJiYmQ1MzI2YjhiYTAyMDZmMzIxIn0sImlhdCI6MTYzMjk5NzQzM30.8i9zM74Lkzix7A81q3lcxb5li1LP4PTlsuDtS_dV6mM"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

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