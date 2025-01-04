import { useState } from 'react'
import './App.css'
import EmployeesContainer from './components/EmployeesContainer'
import LoginContainer from './components/LoginContainer'
import User from './entities/User'
import MenuComponent from './components/MenuComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CategoriesContainer from './components/DeparmentsContainer'

function App() {
  const [user, setUser] = useState<User | null>(null)
  return (
    <BrowserRouter>
      <div className='App'>
        { user && 
            <MenuComponent /> 
          }
        <div className='content'>
          <Routes>
            <Route 
              path='/login'
              element={
                <LoginContainer
                  user={user}
                  onGetUser={async (val: User | null) => setUser(val) }
                />
              }
            />
            <Route
              path='/'
              element={
                user ? <MenuComponent /> : <Navigate to="/login" />
              }
            />
            <Route 
              path='/menu'
              element={
                <MenuComponent />
              }
            />
            
          </Routes>
        </div>
        
      </div>
      
    </BrowserRouter>
    
  )
}

export default App
