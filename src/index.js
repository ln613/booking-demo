import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers';
import App from './App';
import './styles/index.css';
import registerServiceWorker from './utils/registerServiceWorker';

const store = createStore(reducers);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>, document.getElementById('root')
);

registerServiceWorker();
