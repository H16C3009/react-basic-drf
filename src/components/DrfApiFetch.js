import Axios from 'axios'
import React, { useState, useEffect } from 'react'

const DrfApiFetch = () => {
    const [ tasks, setTasks ] = useState([])
    const [ selectedTask, setSelectedTask ] = useState([])
    const [ id, setId] = useState(1)
    
    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/v1/api/tasks/', {
            headers: {
                'Authorization': 'Token fd92847e04d5748fa8d13489937c239b86d928d5'
            }
        }).then( res => {
            setTasks(res.data)
        })
    }, [])

    const getTask = () => {
        Axios.get(`http://127.0.0.1:8000/v1/api/tasks/${id}`, {
            headers: {
                'Authorization': 'Token fd92847e04d5748fa8d13489937c239b86d928d5'
            }
        }).then( res => {
            setSelectedTask(res.data)
        })
    }

    const deleteTask = () => {
        Axios.delete(`http://127.0.0.1:8000/v1/api/tasks/${id}`, {
            headers: {
                'Authorization': 'Token fd92847e04d5748fa8d13489937c239b86d928d5'
            }
        }).then( res => console.log(res))
    }

    return (
        <>
            <ul>
                {
                    tasks.map( (task, index) => (
                        <li key={index}>{task.id} {task.title}</li>
                    ))
                }
                set id <br />
                <input type='text' value={id} onChange={ e => setId(e.target.value) } />
                <br />
                <button onClick={getTask} >Get Task</button>
                <br />
                <button onClick={deleteTask} >Delete Task</button>
            <h3>{selectedTask.title}</h3>
            </ul>
        </>
    )
}

export default DrfApiFetch
