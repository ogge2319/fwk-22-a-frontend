import React, { useState } from "react";
import { Board, Header, ScoreBoard, GameStatus, AboutModal } from "@hodmanliban/gomoku-components";
import "@hodmanliban/gomoku-components/index.css";
import styles from "./GamePage.module.css";
import { useGame } from "../providers/GameProvider";

function GamePage() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const { board, currentPlayer, winner, scoreX, scoreO, status, handleCellClick, resetGame, size } = useGame();

    return (
        <div className={styles.gameContainer}>
            <div className={styles.leftSpacer}></div>

            <div className={styles.centerColumn}>
                <Header
                    currentPlayer={currentPlayer}
                    winner={winner}
                />

                <Board
                    board={board}
                    onCellClick={handleCellClick}
                    size={size}
                />
            </div>

            <div className={styles.scoreboardRight}>
                <ScoreBoard
                    scoreX={scoreX}
                    scoreO={scoreO}
                    onAbout={() => setIsAboutOpen(true)}
                    onRestart={resetGame}
                />
            </div>

            <AboutModal
                isOpen={isAboutOpen}
                onClose={() => setIsAboutOpen(false)}
            />
        </div>
    );
}

export default GamePage;
