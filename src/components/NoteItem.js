import React from 'react';

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3">
            <div class="card my-2" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, labore! Minima corporis dolorum reprehenderit at provident nesciunt ducimus magni ratione ex. Repellendus blanditiis eveniet velit? Neque, rem. Debitis, dignissimos nostrum.</p>
                    <p className="card-text">{note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
