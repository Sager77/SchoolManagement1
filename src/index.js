import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 API for root rendering
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Import your custom styles if needed
import App from './App'; // Your App component

// Create a root using React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />  {/* Your App component */}
  </React.StrictMode>
);
