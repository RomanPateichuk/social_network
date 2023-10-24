import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';


let root = ReactDOM.createRoot(document.getElementById('root'))


root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();

// store.subscribe(() => {
//   let state = store.getState();
//   rerenderEntireTree(state)
// });