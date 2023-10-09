import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let root = ReactDOM.createRoot(document.getElementById('root'))

export let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
    </React.StrictMode>
  );
}


rerenderEntireTree(store.getState())
reportWebVitals();
store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state)
});