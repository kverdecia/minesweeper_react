import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Link} from "react-router-dom";


const BoardRow = ({board}) =>
    <tr>
        <td>{board.rows}</td>
        <td>{board.columns}</td>
        <td>{board.mines}</td>
        <td>{board.finished}</td>
        <td>{moment(board.created).format("MM/DD/YYYY HH:mm:ss")}</td>
        <td>{moment(board.modified).format("MM/DD/YYYY HH:mm:ss")}</td>
        <td>
            <Link to={`/${board.id}`} className="btn btn-primary">View board</Link>
        </td>
    </tr>
BoardRow.propTypes = {
    board: PropTypes.object.isRequired
}


export const BoardList = ({boards}) => {
    boards = boards || []
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Rows</th>
                    <th>Columns</th>
                    <th>Mines</th>
                    <th>Finshed</th>
                    <th>Created</th>
                    <th>Last modified</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {boards.map(board => <BoardRow key={board.id} board={board} />)}
            </tbody>
        </table>
    )
}
BoardList.propTypes = {
    boards: PropTypes.array.isRequired
}
