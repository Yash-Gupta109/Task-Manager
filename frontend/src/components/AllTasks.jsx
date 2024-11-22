import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function AllTasks() {

    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    
    useEffect(()=>{
        const fetchedTasks = async () =>{
            try {
                const response = await axios('http://localhost:8000')
                setTasks(response.data.data)
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchedTasks();
    }, [])

    const deleteTask = async () => {
        
    }

    return (
        <div className='p-6'>
            <h1 className='flex justify-center text-center text-4xl font-semibold'>AllTasks</h1>
            <Link to='/addTasks' className='mt-10 text-xl bg-orange-500 p-2 rounded-xl text-white font-semibold'>Add New Task</Link>
            <div className='flex mt-5 flex-wrap gap-4'>
                {tasks.map((task) => (
                    <div className='border border-b-8 w-fit p-4 ' key={task._id}>
                        <p className='text-xl'><span className='text-xl font-semibold'>Task:</span> {task.taskData}</p>
                        <p className='text-xl'><span className='text-xl font-semibold'>Created At:</span> {task.createdAt}</p>
                        <p className='text-xl'><span className='text-xl font-semibold'>Last Updated At:</span> {task.updatedAt}</p>
                        <div className='flex justify-between'>
                            <Link to={`/updateTask/${task._id}`} className='text-blue-600 pt-2'>Update Task</Link>
                            <Link 
                                to={`/deleteTask/${task._id}`}
                                className='text-red-600'
                                onClick={async () => {
                                    await axios.delete(`http://localhost:8000/deleteTask/${task._id}`)
                                    // alert("post deleted successfully")
                                    navigate('/')
                                }}
                            >Delete</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllTasks

