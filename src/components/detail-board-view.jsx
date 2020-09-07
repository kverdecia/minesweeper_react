import React, { useState, useEffect } from 'react'
import useFetch from 'use-http'
import {
    useParams,
    Link,
} from "react-router-dom"
import {Board} from './board'


export const DetailBoardView = () => {
    const {boardId} = useParams()
    const url = `/api/v1/boards/${boardId}/`
    const [board, setBoard] = useState(null);
    const { get, put, response, loading, error, cache } = useFetch('', {cachePolicy: 'no-cache'})

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
        const newBoard = await put(url, {row, column, operation: 'reveal_cell'})
        if (response.ok) {
            setBoard(newBoard)
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
        const newBoard = await put(url, {row, column, operation: 'mark_cell'})
        if (response.ok) {
            setBoard(newBoard)
            await cache.delete()
        }
    }

    return (
        <div className="container-fluid">
            <h3>
                Minesweeper Board
            </h3>
            <div>
                <span className="badge badge-info">Click</span> to reveal a cell
            </div>
            <div>
                <span className="badge badge-info">Ctrl + Click</span> to mark a cell
            </div>
            <div>
                <span style={{visibility: 'hidden'}}>Status: </span>
                {error && 'Error loading boards!'}
                {loading && 'Loading boards...'}
            </div>
            {board && <Board board={board.display_board} onReveal={onReveal} onMark={onMark} />}

            <div className="mt-3">
                <Link to="/" className="btn btn-primary">Return</Link>
            </div>

        </div>
    )
}
