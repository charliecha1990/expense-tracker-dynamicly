import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { TransactionList } from './components/TransactionList';
import { GlobalProvider } from './context/GlobalState';

import Grid from '@material-ui/core/Grid';


function App() {
  return (
      <GlobalProvider>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={10}>
            <Balance />
            <TransactionList />
          </Grid>
        </Grid>
      </GlobalProvider>
  );
}

export default App;
