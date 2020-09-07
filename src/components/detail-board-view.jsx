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
                await cache.delete()
            }
        }
        loadBoard() 
    }, [boardId])

    const onReveal = async (row, column) => {
        console.log("onReveal", row, column)
        if (loading) {
            console.log("Cannot reveal the cell: pending operation.")
            return
        }
        const board = await put(url, {row, column, operation: 'reveal_cell'})
        if (response.ok) {
            setBoard(board)
            await cache.delete()
        }
    }

    const onMark = async (row, column) => {
        console.log("onMark", row, column)
        if (loading) {
            console.log("Cannot mark the cell: pending operation.")
            return
        }
        const board = await put(url, {row, column, operation: 'mark_cell'})
        if (response.ok) {
            setBoard(board)
            await cache.delete()
        }
    }

    return (
        <div className="container-fluid">
            <h3>
                Minesweeper Board
            </h3>
            <div>
                <span>Status: </span>
                {error && 'Error loading boards!'}
                {loading && 'Loading boards...'}
            </div>
            {board && <Board board={board.display_board} onReveal={onReveal} onMark={onMark} />}

            <Link to="/" className="btn btn-primary">Return</Link>
        </div>
    )
}
