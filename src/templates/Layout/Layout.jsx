import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Layout.css";

function Layout({ children }) {
    const location = useLocation();
    const isGamePage = location.pathname === "/game";

    return (
        <div className="layout">
            <header className="layout-header">
                {isGamePage && (
                    <nav>
                        <Link to="/">Hem</Link>
                    </nav>
                )}
            </header>

            <main className="layout-main">
                {children}
            </main>

            <footer className="layout-footer">
                <p>&copy; 2025 Gomoku Game</p>
            </footer>
        </div>
    );
}

export default Layout;