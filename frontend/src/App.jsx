import './App.css'
import { Routes, Route } from 'react-router-dom'
import { CreateProject } from './pages/CreateProject'
import { Router } from './Routes'
import {io} from 'socket.io-client'

function App() {

  const socket = io('http://localhost:3000')

  return (

   <Router />

  )
}

export default App
