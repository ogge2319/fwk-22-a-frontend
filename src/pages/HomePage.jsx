import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomePage as HomePageComponent } from '@hodmanliban/gomoku-components';

function HomePage() {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate('/game');
    };

    return (
        <div style={{ width: '100%', height: '100%', flex: 1 }}>
            <HomePageComponent onStartGame={handleStartGame} />
        </div>
    );
}

export default HomePage;