import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import JokeContextProvider from './components/jokeContext';
import RandomJokeContextProvider from './components/randomJoke';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JokeContextProvider>
      <RandomJokeContextProvider>
            <App />
      </RandomJokeContextProvider>
    </JokeContextProvider>

  </React.StrictMode>
);
