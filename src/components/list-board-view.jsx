import React, { useEffect, useState } from 'react'
import {BoardList} from './board-list'
import useFetch from 'use-http'


export const ListBoardView = () => {
    const [boardList, setBoardList] = useState([])

    const { get, response, loading, error } = useFetch('/api/v1/boards/', {cachePolicy: 'no-cache'})

    useEffect(() =>{
        async function loadBoardList() {
            const boardList = await get("")
            if (response.ok) {
                setBoardList(boardList)
            }
        }
        loadBoardList() 
    }, [])

    return (
        <div className="container-fluid">
            <h3>Created boards</h3>
            {error && 'Error loading boards!'}
            {loading && 'Loading boards...'}
            <BoardList boards={boardList} />
        </div>
    )
}
