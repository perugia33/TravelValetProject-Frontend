import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import PackingList from './pages/PackingList'
import DestinationGuide from './pages/DestinationGuide'
import Login from './pages/Login' 
import SavedLists from './components/SavedLists'  
import SavedListDetails from './components/SavedListDetails'  
import ExpenseTracker from './pages/ExpenseTracker'
import NotFound from './pages/NotFound'


function App() {
 
  return (    
     <BrowserRouter>
        <Routes>   
            <Route path="/" element={<Homepage />} />
            <Route path="packinglist" element={<PackingList />} />
            <Route path="dining" element={<DestinationGuide />} />  
            <Route path="login" element={<Login />} />
            <Route path="savedLists" element={<SavedLists />} />  
            <Route path="savedListDetails/:id" element={<SavedListDetails />} />  
            <Route path="expenses" element={<ExpenseTracker />} />
            <Route path="*" element={<NotFound />} />
        </Routes> 
     
    </BrowserRouter>

  )
}

export default App