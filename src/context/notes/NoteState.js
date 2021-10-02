import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6157fadb46dbbbb5b0a42f44",
            "user": "61532bbd5326b8ba0206f321",
            "title": "wwwwwoe",
            "description": "de hello",
            "tag": "personal",
            "date": "2021-10-02T06:23:23.643Z",
            "__v": 0
        },
        {
            "_id": "6157fadc46dbbbb5b0a42f46",
            "user": "61532bbd5326b8ba0206f321",
            "title": "wwwwwoe",
            "description": "de hello",
            "tag": "personal",
            "date": "2021-10-02T06:23:24.734Z",
            "__v": 0
        },
        {
            "_id": "6157fadd46dbbbb5b0a42f48",
            "user": "61532bbd5326b8ba0206f321",
            "title": "wwwwwoe",
            "description": "de hello",
            "tag": "personal",
            "date": "2021-10-02T06:23:25.489Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;