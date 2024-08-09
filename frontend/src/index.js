// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { Provider } from 'react-redux';
// import store from './redux/store'; // Import as default

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import store from './redux/store';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import App from './App';
import './index.css';  // Ensure you have imported your index.css

const root = ReactDOM.createRoot(document.getElementById('root'));
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.className = savedTheme;

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);