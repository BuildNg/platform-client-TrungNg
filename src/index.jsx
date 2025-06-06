import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import './style.scss';

const root = createRoot(document.getElementById('main'));
root.render(<App />);
