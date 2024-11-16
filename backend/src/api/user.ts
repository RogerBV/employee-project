import express from 'express'
import { login } from '../controllers/userController'

const userRouter = express.Router()

userRouter.route('/login')
    .post(login)

export { userRouter }