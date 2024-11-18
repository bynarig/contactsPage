// src/index.tsx
import './index.scss'; // This will apply Tailwind styles globally
import './scss-reset.scss'; // This will apply your custom styles globally
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
