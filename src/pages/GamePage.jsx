import React, { useState } from "react";
import { Board, Header, ScoreBoard, GameStatus } from "@hodmanliban/gomoku-components";
import "@hodmanliban/gomoku-components/index.css";

function GamePage() {
    const [board, setBoard] = useState(Array(225).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');

    const handleCellClick = (index) => {
        if (board[index] !== null) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <Header
                title="Gomoku Spel"
                currentPlayer={currentPlayer}
                status={`${currentPlayer}s tur`}
            />

            <ScoreBoard
                scoreX={0}
                scoreO={0}
                onRestart={() => {
                    setBoard(Array(225).fill(null));
                    setCurrentPlayer('X');
                }}
            />

            <Board
                board={board}
                onCellClick={handleCellClick}
                size={15}
            />
        </div>
    );
}

export default GamePage;
