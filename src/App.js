import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import {ListBoardView} from './components/list-board-view'
import {DetailBoardView} from './components/detail-board-view'
import {AddBoardView} from './components/add-board-view'


function App() {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <h1>MineSweeper <a href="/accounts/logout" className="btn btn-link">Logout</a></h1>
            </div>
            <Router>
                <Switch>
                    <Route path="/new">
                        <AddBoardView />
                    </Route>
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
