import { Request, Response } from 'express'
import { loginDAO } from '../dao/UserDAO'
import jwt from 'jsonwebtoken'

const login = async (request: Request, response: Response): Promise<void> =>  {
    try {
        const objParams = request.body as { userName, password }
        const result = await loginDAO(objParams.userName, objParams.password)

        const token = jwt.sign(
            { id: result.id, username: result.userName },
            process.env.SECRET_JWT_KEY,
            {
                expiresIn: '1h'
            }
        )
        
        result ? 
        response
            .cookie('access_token', token, {
                httpOnly: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60
            })
        .json({ user: result }) : response.json(null)
    } catch(error) {
        console.log(error)
    }
}

export { login }