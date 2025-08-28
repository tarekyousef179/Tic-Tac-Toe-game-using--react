export default function GameOver({ winner, rematch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner ? `the winner is ${winner}` : "there is a Drow !"}</p>
      <p>
        <button onClick={rematch}>Rematch</button>
      </p>
    </div>
  );
}
