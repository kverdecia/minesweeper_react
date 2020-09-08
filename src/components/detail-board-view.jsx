import React, { useState, useEffect } from 'react'
import useFetch from 'use-http'
import {
    useParams,
    useHistory,
    Link,
} from "react-router-dom"
import {Board} from './board'


const isWonBoard = (board) => {
    if (board.finished) {
        for (const row of board.display_board) {
            for (const value of row) {
                if (value === '**')
                    return false
            }
        }
        return true
    }
    return false
}



export const DetailBoardView = () => {
    const {boardId} = useParams()
    const history = useHistory()
    const url = `/api/v1/boards/${boardId}/`
    const [board, setBoard] = useState(null);
    const { get, put, del, response, loading, error, cache } = useFetch('', {cachePolicy: 'no-cache'})

    useEffect(() => {
        async function loadBoard() {
            const board = await get(url)
            if (response.ok) {
                setBoard(board)
            }
        }
        loadBoard() 
    }, [boardId])

    const onReveal = async (row, column) => {
        if (board && board.finished)
            return
        if (loading) {
            console.log("Cannot reveal the cell: pending operation.")
            return
        }
        const updatedBoard = await put(url, {row, column, operation: 'reveal_cell'})
        if (response.ok) {
            setBoard(updatedBoard)
            await cache.delete()
        }
    }

    const onMark = async (row, column) => {
        if (board && board.finished)
            return
        if (loading) {
            console.log("Cannot mark the cell: pending operation.")
            return
        }
        const updatedBoard = await put(url, {row, column, operation: 'mark_cell'})
        if (response.ok) {
            setBoard(updatedBoard)
            await cache.delete()
        }
    }

    const onDelete = async () => {
        if (loading) {
            console.log("Cannot delete the board: pending operation.")
            return
        }
        if (window.confirm("Do you want to delete this board?")) {
            await del(url)
            if (response.ok) {
                history.replace("/")
            }
        }
    }

    return (
        <div className="container-fluid">
            <h3>
                Minesweeper Board
            </h3>
            {board && !board.finished && 
            <React.Fragment>
                <div>
                    <span className="badge badge-info">Click</span> to reveal a cell
                </div>
                <div>
                    <span className="badge badge-info">Ctrl + Click</span> to mark a cell
                </div>
            </React.Fragment>
            }
            {board && board.finished && isWonBoard(board) &&
            <div>
                <span className="badge badge-info text-uppercase">You won!!!</span>
            </div>
            }
            {board && board.finished && !isWonBoard(board) &&
            <div>
                <span className="badge badge-danger text-uppercase">You lost</span>
            </div>
            }
            
            <div>
                <span style={{visibility: 'hidden'}}>Status: </span>
                {error && 'Error loading boards!'}
                {loading && 'Loading boards...'}
            </div>
            {board && <Board board={board.display_board} onReveal={onReveal} onMark={onMark} />}

            <div className="mt-3">
                <Link to="/" className="btn btn-primary">Return</Link>{' '}
                <button className="btn btn-danger" onClick={onDelete}>Delete this board</button>
            </div>

        </div>
    )
}
