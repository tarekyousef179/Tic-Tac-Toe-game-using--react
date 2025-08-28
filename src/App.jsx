import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver";
function deriveActivePlayer(turns) {
  let activePlayer = "x";
  if (turns.length > 0 && turns[0].player === "x") {
    activePlayer = "y";
  }
  return activePlayer;
}
let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function App() {
  const [players, setPlayers] = useState({
    x: "player1",
    y: "player2",
  });
  const [turns, setTurns] = useState([]);
  let gameBoard = [...initialGameBoard.map((row) => [...row])];
  for (let turn of turns) {
    let { square, player } = turn;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }
  let activeplayer = deriveActivePlayer(turns);
  let winner;
  for (let combinations of WINNING_COMBINATIONS) {
    let firstSquare = gameBoard[combinations[0].row][combinations[0].column];
    let secondSquare = gameBoard[combinations[1].row][combinations[1].column];
    let thirdSquare = gameBoard[combinations[2].row][combinations[2].column];
    if (
      firstSquare === secondSquare &&
      secondSquare === thirdSquare &&
      firstSquare !== null
    ) {
      winner = players[firstSquare];
      break;
    }
  }
  const isDrow = turns.length === 9 && winner === undefined;
  console.log(isDrow);
  const handelSelectSquare = function (rowIndex, colIndex) {
    setTurns((prevturns) => {
      let currentPlayer = deriveActivePlayer(prevturns);
      let updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevturns,
      ];
      return updatedTurns;
    });
  };
  const handleRematch = function () {
    setTurns([]);
  };
  const handelUpdatePlayersName = function (symbol, newName) {
    setPlayers((prevNames) => {
      return {
        ...prevNames,
        [symbol]: newName,
      };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ul id="players" className="highlight-player">
          <Player
            initailName="Player1"
            sympol="x"
            isActive={activeplayer === "x"}
            updatePlayersName={handelUpdatePlayersName}
          />
          <Player
            initailName="Player2"
            sympol="y"
            isActive={activeplayer === "y"}
            updatePlayersName={handelUpdatePlayersName}
          />
        </ul>
        {(winner || isDrow) && (
          <GameOver winner={winner} rematch={handleRematch} />
        )}
        <GameBoard
          handelButtonClicked={handelSelectSquare}
          gameBoard={gameBoard}
        />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
