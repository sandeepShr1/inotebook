import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Register from './components/Register';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <div className="true">
      <NoteState>
        <Router>
          <Navbar title="iNotebook" />
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/">
              <Home showAlert={showAlert} />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/register">
              <Register showAlert={showAlert} />
            </Route>
          </Switch>
        </Router >
      </NoteState>
    </div >
  );
}

export default App;
