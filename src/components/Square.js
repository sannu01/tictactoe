import React from "react";

const Square = ({ value, onClick, isWinningSquare, playerId, nextPlayer }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`square ${isWinningSquare ? "winning" : ""} ${
        value === "X" ? "text-green" : "text-orange"
      }`}
      disabled={playerId !== nextPlayer}
    >
      {value}
    </button>
  );
};

export default Square;
