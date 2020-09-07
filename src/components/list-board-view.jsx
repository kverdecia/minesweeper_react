import React from 'react'
import {BoardList} from './board-list'
import useFetch from 'use-http'


export const ListBoardView = () => {
    const { loading, error, data = [] } = useFetch('/api/v1/boards/', {}, [])
    return (
        <div className="container-fluid">
            <h3>Created boards</h3>
            {error && 'Error loading boards!'}
            {loading && 'Loading boards...'}
            <BoardList boards={data} />
        </div>
    )
}
