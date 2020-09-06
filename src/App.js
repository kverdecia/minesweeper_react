import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BoardView} from './components/board-view'

function App() {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <h1>MineSweeper</h1>
            </div>
            <BoardView />
        </React.Fragment>
    );
}

export default App;
