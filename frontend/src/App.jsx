import { useState } from 'react'
// import './App.css'
import AllTasks from './components/AllTasks'
import UpdatePost from './components/UpdatePost'
import CreatePost from './components/CreatePost'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AllTasks/>}/>
        <Route path='/addTasks' element={<CreatePost/>}/>
        <Route path='/updateTask/:id' element={<UpdatePost/>}/>
      </Routes>
    </Router>
  )
}

export default App
