import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UpdatePost() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [taskData, setTaskData] = useState('')

    const handleInputChange = (e) => {
        setTaskData(e.target.value)
    }

    const handleUpdateBtn = async () => {
        if(!taskData){
            alert('Please enter task data')
            return;
        }
        try {
            const response = await axios.put(`https://task-manager-backend-8z2t.onrender.com/updateTask/${id}`, {taskData})
            alert(response.data.message);
            navigate('/'); 
        } catch (error) {
            console.log("error while updating task", error);
        }
    }
    

    return (
        <div className='p-6'>
            <h1 className='flex justify-center text-center text-4xl font-semibold'>UPDATE TASK</h1>
            <div className='flex items-center justify-center mt-20'>
                <input 
                    type="text" 
                    className='border border-orange-500 outline-none p-2 w-[500px] rounded'
                    value={taskData}
                    onChange={handleInputChange}
                />
            </div>
            <div className='flex items-center justify-center mt-5'>
                <button 
                    className='border border-black px-3 py-1 text-xl font-semibold rounded'
                    onClick={handleUpdateBtn}    
                >Update</button>
            </div>
        </div>
    )
}

export default UpdatePost
