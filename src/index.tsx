import reportWebVitals from './reportWebVitals';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { SamuraiJSApp } from './App';
import './index.css';

let rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
  <SamuraiJSApp />
)

reportWebVitals();
