// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomePage as HomePageComponent } from '@hodmanliban/gomoku-components';

function HomePage() {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate('/game');
    };

    return (
        <div>
            <HomePageComponent onStartGame={handleStartGame} />
        </div>
    );
}

export default HomePage;