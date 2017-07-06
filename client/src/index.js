import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
<<<<<<< HEAD
// import { Provider } from 'react-redux';
// import store from '../store';
=======
import { Provider } from 'react-redux';
import store from './store';

>>>>>>> 6e966660be0cf1409fde9afc8243ce1cf33fb343
import './index.css';


ReactDOM.render(
<<<<<<< HEAD
  // <Provider store={store}>
    <App />,
  // </Provider>,
=======
  <Provider store={store}>
  <App />
  </Provider>,
>>>>>>> 6e966660be0cf1409fde9afc8243ce1cf33fb343
  document.getElementById('root')
);
