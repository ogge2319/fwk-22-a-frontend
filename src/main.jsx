// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MockGameProvider, HeaderFromContext, Board } from '@hodmanliban/gomoku-components';

function App() {
  return (
    <MockGameProvider>
      <div className="game-container">
        <HeaderFromContext />
        <Board />
      </div>
    </MockGameProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export default App;