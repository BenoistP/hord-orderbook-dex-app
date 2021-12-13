import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'
import theme from './styles/theme'
import Dashboard from './views/dashboard/components'

function App() {
  return (
     <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Dashboard blockchainApi={'BSC'} account={'0x0'} />
   </ThemeProvider>
  );
}

export default App;
