import { useState } from "react"
import LoginPresenter from "./LoginPresenter"
import User from "../entities/User"
import { loginUser } from "../api/EmployeeEndpoint"

interface LoginProps {
    user: User | null
    onGetUser: (val: User | null)  => Promise<void>
}

const LoginContainer = ({ user, onGetUser }: LoginProps ) => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        const objResult = await loginUser(userName, password)
        console.log(objResult.user)
        objResult ? onGetUser(objResult.user) : onGetUser(null)

    }

    return (
        <LoginPresenter
            userNameParam={userName}
            onUserName={ 
                async (val: string) => setUserName(val)
            }
            password={password}
            onPassword={
                async (val: string) => setPassword(val)
            }
            onLogin={
                () => login()
            }
        />
    )
}

export default LoginContainer