import { getDatabase, ref, set, get, child } from "firebase/database";

export function writeNewGame(id, name, board) {
  const db = getDatabase();
  const promise = new Promise((resolve, reject) => {
    set(ref(db, "games/" + id), {
      players: [name],
      board: board,
      winner: "",
      nextPlayer: 0,
      inProgress: false,
    })
      .then((val) => {
        resolve(true);
      })
      .catch((err) => {
        reject(false);
      });
  });

  return promise;
}

export function joinGame(id, name) {
  const dbRef = ref(getDatabase());
  const promise = new Promise((resolve, reject) => {
    get(child(dbRef, `games/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const newplayers = data.players;
          if (data.winner || data.endGame) {
            // eslint-disable-next-line no-throw-literal
            throw "Game is already finished";
          }
          if (newplayers.length > 1 || data.inProgress) {
            // eslint-disable-next-line no-throw-literal
            throw "Game Already have 2 players";
          }

          newplayers.push(name);
          const newData = { ...data, players: newplayers, inProgress: true };
          updateGameData(id, newData);
          resolve(true);
        } else {
          reject("No game available");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
}

export function updateGameData(gameId, gameData) {
  const db = getDatabase();
  set(ref(db, "games/" + gameId), gameData);
}
