import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import {ListBoardView} from './components/list-board-view'
import {DetailBoardView} from './components/detail-board-view'


function App() {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <h1>MineSweeper</h1>
            </div>
            <Router>
                <Switch>
                    <Route path="/:boardId">
                        <DetailBoardView />
                    </Route>
                    <Route path="/">
                        <ListBoardView />
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
