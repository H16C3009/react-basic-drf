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

    console.log(tasks)

    return (
        <>
            <ul>
                {
                    tasks.map( (task, index) => (
                        <li key={index}>{task.id} {task.title}</li>
                    ))
                }
            </ul>
        </>
    )
}

export default DrfApiFetch
