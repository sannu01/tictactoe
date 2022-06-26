import React, { Component } from "react";

import { onValue, getDatabase, ref } from "firebase/database";
import StatusMessage from "./StatusMessage";
import Board from "./Board";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import { calculateWinner } from "../helpers";
import { updateGameData } from "../utils/FirebaseDatabase";
const NEW_GAME = Array(9).fill('0');

class Game extends Component {
  state = {
    gameId: "",
    playerId: 0,
    openCreateGameDialog: false,
    openJoinGame: false,
    playersIcon: ["O", "X"],
    gameStatus: null,
    winner: "",
    winningSquares: [],
    gameInProgress: false,
  };
  listenUpdate(gameId) {
    const db = getDatabase();
    const gameRef = ref(db, "games/" + gameId);
    onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      this.getUpdatedGameData(data);
    });
  }
  createNewGameData = (gameId) => {
    this.setState({ gameId: gameId, playerId: 0 });
    this.listenUpdate(gameId);
  };
  joinExistingGame = (gameId) => {
    this.setState({ gameId: gameId, playerId: 1, openJoinGame: false });
    this.listenUpdate(gameId);
  };
  getUpdatedGameData = (gameData) => {
    const { openCreateGameDialog } = this.state;
    if (openCreateGameDialog) {
      this.setState({
        openCreateGameDialog: !gameData.inProgress,
      });
    }
    this.setState({
      gameStatus: gameData,
      gameInProgress: gameData.inProgress,
    });
  };
  handleSquareClick = (position) => {
    const { winner, playersIcon, gameStatus, gameId } = this.state;

    if (gameStatus.board[position] || winner) {
      return;
    }
    var newboard = gameStatus.board;
    newboard[position] =
      gameStatus.nextPlayer === 0 ? playersIcon[0] : playersIcon[1];
    const newWinner = this.handleCheckWinner(newboard);
    const newNextPlayer = gameStatus.nextPlayer === 0 ? 1 : 0;

    const newGameData = {
      ...gameStatus,
      winner: newWinner.winner,
      winningSquares: newWinner.winningSquares,
      nextPlayer: newNextPlayer,
      board: newboard,
      replay: "",
    };

    updateGameData(gameId, newGameData);
  };
  handleCheckWinner = (board) => {
    const { winner, winningSquares } = calculateWinner(board);

    return {
      winner: winner,
      winningSquares: winningSquares,
    };
  };
  handleOpenCreateGameDialog = (state) => {
    this.setState({
      openCreateGameDialog: state,
    });
  };
  handleOpenJoinGameDialog = (state) => {
    this.setState({
      openJoinGame: state,
    });
  };
  onNewGame = () => {
    const { gameStatus, gameId, playerId } = this.state;
    const replay = `${gameStatus.players[playerId]}`;
    var newGame = {
      ...gameStatus,
      replay: replay,
      board: NEW_GAME,
      nextPlayer: 0,
      winner: "",
      winningSquares: "",
    };

    updateGameData(gameId, newGame);
  };
  onEndGame = () => {
    const { gameStatus, playerId, gameId } = this.state;
    const replay = `${gameStatus.players[playerId]}`;
    var newGame = {
      ...gameStatus,
      inProgress: false,
      endGame: replay,
      replay: "",
    };

    updateGameData(gameId, newGame);
  };

  render() {
    const {
      openCreateGameDialog,
      openJoinGame,
      gameStatus,
      playerId,
      gameInProgress,
    } = this.state;

    return (
      <div className="Game">
        <h1>
          TIC <span className="text-green">TAC</span> TOE
        </h1>
        {gameStatus && gameStatus.replay && (
          <div className="disappearing-text">{`${
            gameStatus.replay === gameStatus.players[playerId]
              ? "You"
              : gameStatus.replay
          } restarted Game`}</div>
        )}
        {gameStatus && gameStatus.endGame && (
          <div className="disappearing-text">{`${
            gameStatus.endGame === gameStatus.players[playerId]
              ? "You"
              : gameStatus.endGame
          } left Game`}</div>
        )}
        {gameStatus && gameStatus.inProgress && (
          <>
            <StatusMessage
              winner={gameStatus.winner}
              current={gameStatus.nextPlayer}
              board={gameStatus.board}
              players={gameStatus.players}
              playerId={playerId}
            />
            <Board
              board={gameStatus.board}
              handleSquareClick={this.handleSquareClick}
              winningSquares={
                gameStatus.winningSquares ? gameStatus.winningSquares : []
              }
              playerId={playerId}
              nextPlayer={gameStatus.nextPlayer}
            />
          </>
        )}
        {gameStatus && gameStatus.winner && gameInProgress && (
          <button
            type="button"
            className="btn-reset active"
            onClick={this.onNewGame}
          >
            Replay
          </button>
        )}
        {!gameInProgress && (
          <>
            <button
              type="button"
              onClick={() => this.handleOpenCreateGameDialog(true)}
              className="btn-reset active"
            >
              Create new Game
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => this.handleOpenJoinGameDialog(true)}
            >
              Join Game
            </button>
          </>
        )}
        {gameInProgress && (
          <button
            type="button"
            onClick={() => this.onEndGame()}
            className="button-close"
          >
            End Game
          </button>
        )}

        <div className="bg-balls" />
        {openCreateGameDialog && (
          <CreateGame
            handleClose={this.handleOpenCreateGameDialog}
            createNewGameData={this.createNewGameData}
          />
        )}
        {openJoinGame && (
          <JoinGame
            handleClose={this.handleOpenJoinGameDialog}
            joinExistingGame={this.joinExistingGame}
          />
        )}

        <svg class="circular">
          <circle
            className="progress"
            cx="50"
            cy="50"
            r="20"
            strokeWidth="5"
            fill="none"
            strokeMiterlimit="10"
          ></circle>
        </svg>
      </div>
    );
  }
}

export default Game;
