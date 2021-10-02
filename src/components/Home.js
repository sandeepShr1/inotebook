import React from 'react';
import Notes from './Notes';

const Home = () => {
    
    return (
        <div className="container my-3" >
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>

            <Notes />
        </div>
    )
}

export default Home;
