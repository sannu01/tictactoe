import React from "react";
import { writeNewGame } from "../utils/FirebaseDatabase";
const NEW_GAME = Array(9).fill('0');
function JoinGame(props) {
  const [gameId, setGameId] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const createNewGame = () => {
    const gameId = Date.now();
    if (!userName) return;
    writeNewGame(gameId, userName, NEW_GAME).then((val) => {
      setGameId(gameId);
      props.createNewGameData(gameId);
    });
  };

  const handleNameChange = (ev) => {
    setUserName(ev.target.value);
  };
  return (
    <div className="dialog">
      <div className="dialog-content">
        <input
          placeholder="Enter Your Name"
          className="input"
          onChange={handleNameChange}
        />
        {gameId && (
          <span style={{ color: "#000", margin: 8 }}>
            Share the below code to other player
          </span>
        )}
        <span
          style={{
            color: "#000fff",
            display: "flex",
            justifyContent: "center",
            margin: 8,
            fontSize: "20px",
          }}
        >
          {gameId}
        </span>
        <button
          type="button"
          className="btn-reset active"
          onClick={createNewGame}
        >
          Create Game
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

export default JoinGame;
