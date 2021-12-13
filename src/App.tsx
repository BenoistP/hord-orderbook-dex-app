import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'
import theme from './styles/theme'
import Dashboard from './views/dashboard/components'
import * as S from './views/landing/styles'


function App() {
  return (
     <ThemeProvider theme={theme}>
      <GlobalStyles />
      <S.Page>
      <Dashboard blockchainApi={'BSC'} account={'0x0'} />
       </S.Page>
   </ThemeProvider>
  );
}

export default App;
