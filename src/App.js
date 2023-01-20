import React, { useContext, useState,  useRef } from "react";

import { randomJokeContext } from "./components/randomJoke";
import "./App.css";
import { jokeContext } from "./components/jokeContext";

function App() {
  const { state, dispatch } = useContext(jokeContext);
  const { randomJokeState, randomJokeDispatch } = useContext(randomJokeContext);
  const [inputState, setInputState] = useState();
  const inputQuestion = useRef();
  const inputPunchline = useRef();

  function handleFetchJoke() {
    (async () => {
      const res = await fetch(
        "https://backend-omega-seven.vercel.app/api/getjoke"
      );
      const data = await res.json();
      randomJokeDispatch({ type: "FETCH_JOKE", payload: data });
    })();
  }
  function handleRemove(joke) {
    dispatch({ type: "REMOVE_JOKE", payload: joke });
  }

  function saveJoke(e) {
    e.preventDefault();
    if (
      inputState !== undefined &&
      inputState.question &&
      inputState.punchline
    ) {
      dispatch({ type: "ADD_JOKE", payload: inputState });
      setInputState("");
      inputQuestion.current.value = "";
      inputPunchline.current.value = "";
    } else if (inputState === undefined || !inputState.question) {
      inputQuestion.current.style.borderColor = "red";
    } else if (inputState === undefined || !inputState.punchline) {
      inputPunchline.current.style.borderColor = "red";
    }
  }

  function handleChange(e) {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
    e.target.style.borderColor = "";
  }

  return (
    <div className="App">
      <h1>Joke Box</h1>
      <div className="buttons">
        <button className="btn" onClick={handleFetchJoke}>Crack one</button>

        {randomJokeState.joke[0].question ? (
          <div className="jokes">
            <p>{randomJokeState.joke[0].question}</p>
            <p>{randomJokeState.joke[0].punchline}</p>
          </div>
        ) : (
          <p className="jokes">{randomJokeState.joke}</p>
        )}

        <div className="inputs">
          <form onChange={handleChange}>
            <input 
            className="question"
              type="text"
              name="question"
              placeholder="Create your own joke"
              ref={inputQuestion}
            ></input>
            <input
              className="punchline"
              ref={inputPunchline}
              type="text"
              name="punchline"
              placeholder="Punchline"
            ></input>
            <button className="save" onClick={saveJoke}>Save</button>
          </form>
        </div>
        <div className="saveJokes">
          {state.jokes.map((joke, index) => (
            <div key={index}>
              <p style={{ color: "gray" }}>{joke.question}</p>
              <p>{joke.punchline}</p>
              <button onClick={() => handleRemove(joke.question)}>
                remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
