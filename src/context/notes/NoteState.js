import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const s1 = {
        "name": "hero",
        "class": "4f"
    }

    const [state, setState] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "sujan",
                "class": "s2"
            })
        }, 1000);
    }

    return (
        <NoteContext.Provider value={{state:state, update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;