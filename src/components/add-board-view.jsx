import React from 'react'
import useFetch from 'use-http'
import { useHistory, Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";


const schema = yup.object().shape({
    rows: yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        .required("You must write the number or rows")
        .integer().min(10).max(30),
    columns: yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        .required("You must write the number of columns")
        .integer().min(10).max(30),
    mines: yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        .required("You must write the number of mines")
        .integer().min(14)
        .test('minesOverflow',
            "The number of mines cannot be greater than the amount of cells",
            function(value) {
                return value <= this.parent.rows * this.parent.columns
            }
        )
});


export const AddBoardView = () => {
    const { post, response, loading, error } = useFetch('/api/v1/boards/', {cachePolicy: 'no-cache'})
    const history = useHistory()

    const { register, handleSubmit, errors:formErrors } = useForm({
        resolver: yupResolver(schema)
    })

    const createBoard = async (data) => {
        const board = await post("", data)
        if (response.ok) {
            history.push(`/${board.id}`)
        }
        else if (error) {
            alert("Error creating a board.")
        }
    }

    const onSubmit = data => {
        if (data === undefined || loading)
            return
        createBoard(data)
    }

    return (
        <div className="container-fluid">
            <h3>New board</h3>
            {error && 'Error loading boards!'}
            {loading && 'Creating board...'}
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="inputRowCount" className="font-weight-bold">Row count:</label>
                    <input type="number" name="rows" className={`form-control ${formErrors.rows && 'is-invalid'}`} id="inputRowCount" aria-describedby="rowCountHelp"
                        defaultValue={10} ref={register({ required: true })} />
                    {!formErrors.rows && <small id="rowCountHelp" className="form-text text-muted">Count of rows (between 10 and 30).</small>}
                    {formErrors.rows && <div className="invalid-feedback">{formErrors.rows?.message}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="inputColumnCount" className="font-weight-bold">Column count:</label>
                    <input type="number" name="columns" className={`form-control ${formErrors.columns && 'is-invalid'}`} id="inputColumnCount" aria-describedby="columnCountHelp"
                        defaultValue={10} ref={register} />
                    {!formErrors.columns && <small id="columnCountHelp" className="form-text text-muted">Count of columns (between 10 and 30).</small>}
                    {formErrors.columns && <div className="invalid-feedback">{formErrors.columns?.message}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="inputMinesCount" className="font-weight-bold">Mines count:</label>
                    <input type="number" name="mines" className={`form-control ${formErrors.mines && 'is-invalid'}`} id="inputMinesCount" aria-describedby="minesCountHelp"
                        defaultValue={14} ref={register} />
                    {!formErrors.mines && <small id="minesCountHelp" className="form-text text-muted">Count of mines.</small>}
                    {formErrors.mines && <div className="invalid-feedback">{formErrors.mines?.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Create</button>{' '}
                <Link to="/" className="btn btn-secondary">Cancel</Link>
            </form>

        </div>
    )
}
