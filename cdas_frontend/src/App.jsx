// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/navbar'
import Login from './components/form_connex'
import Register from './components/form_inscrip'
import Intro from './components/into'

import Home from './pages/home'


function App() {
  return (
    <Router>
      <Routes>

        {/* <Route path='/' element={<Login />}/> */}
        <Route path='/' element={<Intro />}/>
      </Routes>
       <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
      </Routes> 
     
    </Router>
  )
}

export default App