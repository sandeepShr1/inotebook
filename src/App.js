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

function App() {
  return (
    <div className>
      <NoteState>
      <Router>
      <Navbar title="iNotebook" />
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router >
      </NoteState>
    </div >
  );
}

export default App;
