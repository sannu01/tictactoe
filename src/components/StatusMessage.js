import React from "react";

const StatusMessage = ({ winner, current, board, players, playerId }) => {
  const noMovesLeft = board.every((el) => el !== 0);

  return (
    <div className="status-message">
      {winner && winner !== "Tied" && (
        <>
          Winner is{" "}
          <span className="text-green">
            {winner === "X" ? players[1] : players[0]}
          </span>
        </>
      )}
      {winner === "Tied" && (
        <>
          <span className={"text-orange"}>{winner}</span>
        </>
      )}
      {!winner && !noMovesLeft && (
        <>
          Next player is{" "}
          <span className={current ? "text-green" : "text-orange"}>
            {current === playerId
              ? "You"
              : playerId === 0
              ? players[1]
              : players[0]}{" "}
          </span>
        </>
      )}
      {!winner && noMovesLeft && (
        <>
          <span className="text-green">X</span> and{" "}
          <span className="text-orange">O</span> tied
        </>
      )}
    </div>
  );
};

export default StatusMessage;
