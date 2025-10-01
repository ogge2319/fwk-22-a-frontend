import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

const SIZE = 15;
const WIN = 5;

function emptyBoard() {
    const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
    console.log("Created empty board:", board.length, "x", board[0]?.length);
    return board;
}

function inBounds(r, c) {
    return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function checkWin(board, r, c) {
    const player = board[r][c];
    if (!player) return false;

    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
    ];

    for (const [dr, dc] of directions) {
        let count = 1;

        for (let i = 1; i < WIN; i++) {
            const nr = r + dr * i;
            const nc = c + dc * i;
            if (!inBounds(nr, nc) || board[nr][nc] !== player) break;
            count++;
        }

        for (let i = 1; i < WIN; i++) {
            const nr = r - dr * i;
            const nc = c - dc * i;
            if (!inBounds(nr, nc) || board[nr][nc] !== player) break;
            count++;
        }

        if (count >= WIN) return true;
    }

    return false;
}

export function GameProvider({ children }) {
    const [board, setBoard] = useState(emptyBoard);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);

    const handleCellClick = (r, c) => {
        if (board[r][c] || winner) return;

        const newBoard = board.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
                rowIndex === r && colIndex === c ? currentPlayer : cell
            )
        );

        setBoard(newBoard);

        if (checkWin(newBoard, r, c)) {
            setWinner(currentPlayer);
            if (currentPlayer === "X") {
                setScoreX(prev => prev + 1);
            } else {
                setScoreO(prev => prev + 1);
            }
        } else {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    const resetGame = () => {
        setBoard(emptyBoard());
        setCurrentPlayer("X");
        setWinner(null);
    };

    const resetScore = () => {
        setScoreX(0);
        setScoreO(0);
        setBoard(emptyBoard());
        setCurrentPlayer("X");
        setWinner(null);
    };

    const status = winner
        ? `Spelare ${winner} vinner!`
        : `Spelare ${currentPlayer}s tur`;

    return (
        <GameContext.Provider
            value={{
                board,
                currentPlayer,
                winner,
                scoreX,
                scoreO,
                status,
                handleCellClick,
                resetGame,
                resetScore,
                size: SIZE
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}