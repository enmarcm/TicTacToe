import { useState } from "react";
import Square from "./components/Square.jsx";
import confetti from "canvas-confetti";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/index.js";
import { saveGameToStorage, resetGameStorage } from "./logic/storage.js";
import Winner from "./components/Winner.jsx";

function App() {
  const [board, setBoard] = useState(() => {
    const localBoard = window.localStorage.getItem("board");
    return localBoard ? JSON.parse(localBoard) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const localTurn = window.localStorage.getItem("turn");
    return localTurn ? localTurn : TURNS.X;
  });
  const [winner, setWinner] = useState(null); // Null es que no hay ganador, false es que hay empate

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameToStorage({ board: newBoard, turn: newTurn });

    //Verificamos si hay ganador
    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const reiniciar = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} updateBoard={updateBoard} index={index}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <Winner winner={winner} reiniciar={reiniciar} />
    </main>
  );
}

export default App;
