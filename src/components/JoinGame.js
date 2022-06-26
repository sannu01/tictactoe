import React from "react";
import { joinGame } from "../utils/FirebaseDatabase";

function CreateGame(props) {
  const [gameId, setGameId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [error, setError] = React.useState("");

  const joinExistingGame = () => {
    if (!userName || !gameId) return;
    var time = Date.now();
    time -= gameId;
    time = time / 1000;
    time /= 60;
    if (time > 10) {
      setError("Game code Expired!");
      return;
    }
    joinGame(gameId, userName)
      .then((val) => {
        setError("");
        props.joinExistingGame(gameId);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleNameChange = (ev) => {
    setUserName(ev.target.value);
  };
  const handleCodeChange = (ev) => {
    setGameId(ev.target.value);
  };

  return (
    <div className="dialog">
      <div className="dialog-content">
        <input
          placeholder="Enter Your Name"
          className="input"
          onChange={handleNameChange}
        />
        <input
          placeholder="Enter Game Code"
          className="input"
          onChange={handleCodeChange}
        />
        <label style={{ color: "red" }}>{error}</label>
        <button
          type="button"
          className="btn-reset active"
          onClick={joinExistingGame}
        >
          Join Game
        </button>
        <button
          type="button"
          className="button-close"
          onClick={() => props.handleClose(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CreateGame;
