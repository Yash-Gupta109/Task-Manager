import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreatePost() {
    const navigate = useNavigate()
    const [taskData, setTaskData] = useState('')
    const handleInputChange = (e) =>{
        setTaskData(e.target.value);
    }

    const handleCreatePost = async () => {
        if(!taskData){
            alert('Please enter task data');
            return;
        }
        try {
            const response = await axios.post('https://task-manager-backend-8z2t.onrender.com/addTasks', {taskData});
            alert(response.data.message);
            setTaskData('');
            navigate('/')
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post");
        }
    }

    return (
        <div className='p-6'>
            <h1 className='flex justify-center text-center text-4xl font-semibold'>ADDTASK</h1>
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
                    onClick={handleCreatePost}
                >
                    Create Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost
