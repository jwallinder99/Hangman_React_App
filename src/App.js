//import react and components
import React from 'react';
import Header from './components/Header'
import Game from './components/Game'
import Container from '@mui/material/Container'
//import createTheme and themeProvider to use custom font and colours
import {createTheme, ThemeProvider } from '@mui/material';
import { lightGreen } from '@mui/material/colors';

import './App.css';

//theme object to customize app
const theme = createTheme({
  palette: {
    primary: lightGreen,
  },
  typography: {
    fontFamily: 'Onest'
  }
    
  
})
//Container component from mui with Header Component and Game component. All wrapped in a themeprovider component 
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Game />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
