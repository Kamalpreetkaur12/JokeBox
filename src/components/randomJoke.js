import React, { createContext,useReducer } from "react";

export const randomJokeContext = createContext('');

function randomJokeReducer(state, action) {
  switch (action.type) {
    case "FETCH_JOKE":
      return { joke: action.payload };
      
    default:
      return state;
  }
}
const initialState2 = {
  joke: ["Joke of a day"]
};

export default function RandomJokeContextProvider({ children }) {
const [randomJokeState, randomJokeDispatch] = useReducer(randomJokeReducer, initialState2);

  return (
    <randomJokeContext.Provider value={{ randomJokeState, randomJokeDispatch }}>
      {children}
    </randomJokeContext.Provider>
  );
}