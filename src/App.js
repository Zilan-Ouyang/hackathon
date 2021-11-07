import logo from './logo.svg';
import './App.css';
import Page from './Page';
import MetaMaskModal from './MetaMask';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: grey[500],
      main: grey[800],
      dark: grey[900],
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
function App() {
  let provider = window.web3 && window.web3.currentProvider.isMetaMask;
  console.log(provider)
  return (
    <ThemeProvider theme={theme}>
      <div style={{backgroundColor: '#FFFFFF'}}>
      {provider === undefined ? (
        <MetaMaskModal />
      ) : (<Page />)
      }
      </div>
    </ThemeProvider>
  );
}

export default App;
