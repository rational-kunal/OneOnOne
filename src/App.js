import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Room from './components/Room';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

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

function AppContainer() {
  const theme = createMuiTheme({
    palette: { type: 'dark' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container style={{marginTop: 24, marginBottom: 24}} maxWidth="md">
        <App />
      </Container>
    </ThemeProvider>
  );
}

export default AppContainer;
