import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


let postsData = [
  { id: "1", message: "'Hi, how are you", likeCount: "0" },
  { id: "2", message: "'Hi, how are you", likesCount: '23' },
  { id: "3", message: "It's, my first post", likesCount: "0" },
  { id: "4", message: "It's, my first post", likesCount: "0" },
  { id: "5", message: "It's, my first post", likesCount: "0" },
  { id: "6", message: "It's, my first post", likesCount: "0" },
]


let dialogsData = [
  {
    id: "1",
    name: 'Roman'
  },
  {
    id: "2",
    name: 'Sveta'
  },
  {
    id: "3",
    name: 'Andrey'
  },
  {
    id: "4",
    name: 'Seny'
  },
  {
    id: "5",
    name: 'Sacha'
  }
]

let messagesData = [
  { id: "6", message: "Hi" },
  { id: "7", message: "Hello" },
  { id: "8", message: "How are you?" },
]


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App postsData={postsData} messagesData={messagesData} dialogsData={dialogsData} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
