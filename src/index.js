import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import { Provider } from "react-redux";
import store from "./store";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const turqoiseGreen = '#e75f51'
    , jet = '#264653'
    , spanishViridian = '#264653';


//     {
//     "datePicker": {
//         "color": "#3f51b5",
//         "calendarYearBackgroundColor": "#ffc107",
//         "textColor": "#009688",
//         "calendarTextColor": "#607d8b",
//         "selectColor": "#616161",
//         "selectTextColor": "#ffeb3b"
//     }
// }

const theme1 = getMuiTheme({
  fontFamily: '"Tienne", serif',
  palette: {
    primary1Color: turqoiseGreen,
    accent1Color: jet
  },
  appBar: {
    color: spanishViridian
  }
})

ReactDOM.render(

  <MuiThemeProvider muiTheme={theme1}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>

  , document.getElementById('root'));
unregister();
