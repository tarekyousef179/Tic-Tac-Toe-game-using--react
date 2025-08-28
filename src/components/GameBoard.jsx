export default function GameBoard({ handelButtonClicked, gameBoard }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, index) => (
                <li key={index}>
                  <button
                    disabled={playerSymbol ? true : false}
                    onClick={() => handelButtonClicked(rowIndex, index)}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
