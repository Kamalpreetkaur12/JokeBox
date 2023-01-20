import React, { createContext, useReducer } from 'react'

export const jokeContext = createContext('');

function reducer(state, action) {
  switch (action.type) {
    case "ADD_JOKE":
      return {...state, jokes: [...state.jokes, action.payload]};
    case "REMOVE_JOKE":
      return  {...state, jokes: state.jokes.filter((ele)=>ele.question!==action.payload)}
      default:
      return state;
  }
}

const initialState = {
  jokes: [],
};

export default function JokeContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <jokeContext.Provider value={{ state, dispatch }}>{children}</jokeContext.Provider>
  );
}
