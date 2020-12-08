import Axios from 'axios'
import React, { useState, useEffect } from 'react'

const DrfApiFetch = () => {
    const [ tasks, setTasks ] = useState([])
    const [ selectedTask, setSelectedTask ] = useState([])
    const [ editedTask, setEditTask] = useState({ id: '', title: ''})
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
        Axios.get(`http://127.0.0.1:8000/v1/api/tasks/${id}/`, {
            headers: {
                'Authorization': 'Token fd92847e04d5748fa8d13489937c239b86d928d5'
            }
        }).then( res => {
            setSelectedTask(res.data)
        })
    }

    const deleteTask = ( taskId ) => {
        Axios.delete(`http://127.0.0.1:8000/v1/api/tasks/${taskId}/`, {
            headers: {
                'Authorization': 'Token fd92847e04d5748fa8d13489937c239b86d928d5'
            }
        }).then( res => 
            setTasks(tasks.filter(task => task.id !== taskId))
        )
        setSelectedTask([])
    }

    const createTask = ( task ) => {
        const data = {
            title: task.title
        }
        Axios.post('http://127.0.0.1:8000/v1/api/tasks/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token fd92847e04d5748fa8d13489937c239b86d928d5'
            }
        }).then( res => 
            setTasks([ ...tasks, res.data ])
        )
        setSelectedTask([])
    }

    const handleInputChange = () => e => {
        const value = e.target.value
        const name = e.target.name
        setEditTask({ ...editedTask, [name]: value })
    }

    return (
        <>
            <ul>
                {
                    tasks.map( (task, index) => (
                        <li key={index}>{task.id} {task.title}
                            <button onClick={() => deleteTask(task.id)} >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </li>
                    ))
                }
                set id <br />
                <input type='text' value={id} onChange={ e => setId(e.target.value) } />
                <br />
                <button onClick={() => getTask()} >Get Task</button>
                <h3>{selectedTask.title}</h3>
                <br />
                <input type='text' name='title' value={editedTask.title}
                 onChange={ handleInputChange() } required />
                <button onClick={ () => createTask(editedTask) }>Create Task</button>
            </ul>
        </>
    )
}

export default DrfApiFetch
