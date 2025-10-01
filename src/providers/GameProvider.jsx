import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

const SIZE = 15;
const WIN = 5;

function emptyBoard() {
    const board = Array(225).fill(null); // 15x15 = 225, 1D array
    console.log("Created empty board:", board.length, "cells");
    return board;
}

function inBounds(r, c) {
    return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function checkWin(board, index) {
    const player = board[index];
    if (!player) return false;

    const row = Math.floor(index / SIZE);
    const col = index % SIZE;

    const directions = [
        [0, 1],  // horizontal
        [1, 0],  // vertical  
        [1, 1],  // diagonal \
        [1, -1], // diagonal /
    ];

    for (const [dr, dc] of directions) {
        let count = 1;

        // Check in positive direction
        for (let i = 1; i < WIN; i++) {
            const nr = row + dr * i;
            const nc = col + dc * i;
            if (!inBounds(nr, nc) || board[nr * SIZE + nc] !== player) break;
            count++;
        }

        // Check in negative direction  
        for (let i = 1; i < WIN; i++) {
            const nr = row - dr * i;
            const nc = col - dc * i;
            if (!inBounds(nr, nc) || board[nr * SIZE + nc] !== player) break;
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

    const handleCellClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        if (checkWin(newBoard, index)) {
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
        ? `${winner === 'X' ? 'Black' : 'White'} wins!`
        : `${currentPlayer === 'X' ? 'Black' : 'White'}s turn`;

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