import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'


const EMPTY = 0
const BOMB = 1
const FLAG = 2
const QUESTION = 4
const REVEALED = 8
const KABOOM = 16


const Table = Styled.table`
    background-color: #eeeeee;
`

const TR = Styled.tr`
    background-color: #eeeeee;
    `

const TD = Styled.td`
    background-color: ${props => isNaN(parseInt(props.value)) ? '#aaaaaa;' : '#cccccc;'} 
    border: 1px solid #eeeeee;
    width: 32px;
    height: 32px;
    font-size: 24px;
    padding: 2px;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;

    &:hover {
        cursor: pointer;
    }

`


const BoardCell = ({boardCell, rowPos, colPos, onReveal, onMark}) => {
    const onClick = (event) => {
        event.preventDefault();
        if (event.ctrlKey) {
            onMark(rowPos, colPos)
        }
        else {
            onReveal(rowPos, colPos)
        }
    }
    return (
        <TD onClick={onClick} value={boardCell}>
            {boardCell === '!' && <i class="fa fa-flag"></i>}
            {boardCell === '?' && <i class="fa fa-question"></i>}
            {boardCell === '*' && <i class="fa fa-bomb"></i>}
            {boardCell === '**' && <i class="fa fa-bomb text-danger"></i>}
            {boardCell === ' ' && ' '}
            {parseInt(boardCell) > 0 && boardCell}
        </TD>
    )
}
BoardCell.propTypes = {
    boardCell: PropTypes.string.isRequired,
    rowPos: PropTypes.number.isRequired,
    colPos: PropTypes.number.isRequired,
    onReveal: PropTypes.func.isRequired,
    onMark: PropTypes.func.isRequired
}

const BoardRow = ({boardRow, rowPos, onReveal, onMark}) => 
    <TR>
        {boardRow.map((boardCell, index) =>
            <BoardCell key={index} rowPos={rowPos} colPos={index} boardCell={boardCell} onReveal={onReveal} onMark={onMark} />
        )}
    </TR>
BoardRow.propTypes = {
    boardRow: PropTypes.array.isRequired,
    rowPos: PropTypes.number.isRequired,
    onReveal: PropTypes.func.isRequired,
    onMark: PropTypes.func.isRequired
}

export const Board = ({board, onReveal, onMark}) => {
    return (
        <Table>
            <tbody>
                {board.map((boardRow, index) =>
                    <BoardRow key={index} rowPos={index} boardRow={boardRow} onReveal={onReveal} onMark={onMark} />
                )}
            </tbody>
        </Table>
    )
}
Board.propTypes = {
    board: PropTypes.array.isRequired,
    onReveal: PropTypes.func.isRequired,
    onMark: PropTypes.func.isRequired
}
