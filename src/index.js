import reportWebVitals from './reportWebVitals';
import store from './redux/state'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let root = ReactDOM.createRoot(document.getElementById('root'))

export let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App state={state} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)} />
    </React.StrictMode>
  );
}


rerenderEntireTree(store.getState())
reportWebVitals();
store.subscribe(rerenderEntireTree);