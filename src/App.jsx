import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import PackingList from './pages/PackingList'
import Dining from './pages/Dining'
import Login from './pages/Login' 
import ExpenseTracker from './pages/ExpenseTracker'
import NotFound from './pages/NotFound'

function App() {
 
  return (    
     <BrowserRouter>
        <Routes>   
            <Route path="/" element={<Homepage />} />
            <Route path="packinglist" element={<PackingList />} />
            <Route path="dining" element={<Dining />} />  
            <Route path="login" element={<Login />} />
            <Route path="expenses" element={<ExpenseTracker />} />
            <Route path="*" element={<NotFound />} />
        </Routes> 
     
    </BrowserRouter>

  )
}

export default App