import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/join/:otherPeerId">
          <JoinRoom />
        </Route>
        <Route path="/create">
          <CreateRoom />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
