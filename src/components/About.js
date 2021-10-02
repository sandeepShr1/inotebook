import React, {useContext, useEffect} from 'react';
import noteContext from '../context/notes/NoteContext';


const About = () => {

    const a = useContext(noteContext);
    useEffect(() => {
        a.update();
        
    }, []);

    return (
        <div>
            this is {a.state.name} and he is in class {a.state.class}
        </div>
    )
}

export default About;
