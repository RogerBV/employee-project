import { useState } from 'react'
import './App.css'
import EmployeesContainer from './components/EmployeesContainer'
import LoginContainer from './components/LoginContainer'
import User from './entities/User'

function App() {
  const [user, setUser] = useState<User | null>(null)
  return (
    <div className="App">
      {
        user ? 
        <EmployeesContainer /> 
        : <LoginContainer 
            user={user} 
            onGetUser={
              async (val: User | null) => {
                setUser(val)
              }
            } 
            />
      }
      
    </div>
  )
}

export default App
