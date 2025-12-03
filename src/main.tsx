import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Login from "./login.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Login />
    <App />
  </StrictMode>
);
