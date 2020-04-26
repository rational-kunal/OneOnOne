import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Room from './components/Room';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/join/:otherPeerId">
          <Room />
        </Route>
        <Route path="/create">
          <Room />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
