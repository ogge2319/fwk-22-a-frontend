// src/App.jsx
import React, { useState } from "react";

// ⬇️ Byt till ert faktiska paketnamn om det skiljer sig
import {
  HomePage,
  Header,
  Cell,
  Controls,
  ScoreBoard,
  GameStatus, 
} from "fwk-22-a-components";

// ----- Konstanter -----
const SIZE = 15;       // brädstorlek
const WIN = 5;         // fem i rad

// ----- Hjälpfunktioner -----
function emptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
}

function inBounds(r, c) {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

// Kolla win runt ett senaste drag (r,c) för spelare
function checkWin(board, r, c, player) {
  const dirs = [
    [0, 1],   // →
    [1, 0],   // ↓
    [1, 1],   // ↘
    [1, -1],  // ↙
  ];
  for (const [dr, dc] of dirs) {
    let count = 1;

    // framåt
    let rr = r + dr, cc = c + dc;
    while (inBounds(rr, cc) && board[rr][cc] === player) {
      count++; rr += dr; cc += dc;
    }

    // bakåt
    rr = r - dr; cc = c - dc;
    while (inBounds(rr, cc) && board[rr][cc] === player) {
      count++; rr -= dr; cc -= dc;
    }

    if (count >= WIN) return true;
  }
  return false;
}

function isDraw(board) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!board[r][c]) return false;
    }
  }
  return true;
}

// ----- App -----
export default function App() {
  const [started, setStarted] = useState(false);
  const [board, setBoard] = useState(emptyBoard());
  const [current, setCurrent] = useState("X");
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);
  const [history, setHistory] = useState([]); // för Undo
  const [score, setScore] = useState({ X: 0, O: 0 });

  function handleStart() {
    setStarted(true);
  }

  function handleCellClick(r, c) {
    if (winner || draw) return;
    if (board[r][c]) return;

    const next = board.map(row => row.slice());
    next[r][c] = current;

    // spara historik innan vi ändrar state
    setHistory(h => [...h, { board, current, winner, draw }]);
    setBoard(next);

    if (checkWin(next, r, c, current)) {
      setWinner(current);
      setScore(s => ({ ...s, [current]: s[current] + 1 }));
    } else if (isDraw(next)) {
      setDraw(true);
    } else {
      setCurrent(cur => (cur === "X" ? "O" : "X"));
    }
  }

  function handleReset() {
    setBoard(emptyBoard());
    setCurrent("X");
    setWinner("");
    setDraw(false);
    setHistory([]);
  }

  function handleUndo() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setBoard(prev.board);
    setCurrent(prev.current);
    setWinner(prev.winner);
    setDraw(prev.draw);
    setHistory(h => h.slice(0, -1));
  }

  if (!started) {
    return <HomePage onStart={handleStart} />;
  }

  const statusText = winner
    ? `Vinnare: ${winner}`
    : draw
    ? "Oavgjort!"
    : "Spela på!";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1rem" }}>
      {/* Header visar vems tur det är (eller "-" om spelet är klart) */}
      <Header currentPlayer={winner || draw ? "-" : current} />

      {/* Status (vinst / oavgjort / pågående) */}
      <div style={{ marginTop: "0.5rem" }}>
        <GameStatus status={statusText} />
      </div>

      {/* Poängtavla */}
      <div style={{ margin: "0.5rem 0 1rem" }}>
        <ScoreBoard scoreX={score.X} scoreO={score.O} />
      </div>

      {/* Bräde renderat med Cell-komponenten */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 40px)`,
          gap: "2px",
          userSelect: "none",
        }}
      >
        {board.map((row, r) =>
          row.map((val, c) => (
            <Cell key={`${r}-${c}`} value={val} onClick={() => handleCellClick(r, c)} />
          ))
        )}
      </div>

      {/* Kontroller */}
      <div style={{ marginTop: "1rem" }}>
        <Controls onReset={handleReset} onUndo={handleUndo} />
      </div>
    </div>
  );
}
