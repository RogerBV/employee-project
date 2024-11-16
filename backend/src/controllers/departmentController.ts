import { Request, Response } from "express"
import { getAllDepartmentsDAO, insertDepartmentDAO } from "../dao/DepartmentDAO"

const getAllDepartments = async (request: Request, response: Response): Promise<void> => {
    try {
        const token = request.cookies.access_token
        console.log('Token: ' + token);
        if (!token) {
            response.status(403).send('Access not authorized')
        } else {
            const result = await getAllDepartmentsDAO()
            response.json(result)
        }
    } catch(error) {
        console.error(error)
    }
}

const insertDepartment = async (request: Request, response: Response): Promise<void> => {
    try {
        const objDepartment = request.query as { departmentName }
        const result = await insertDepartmentDAO(objDepartment.departmentName)
        response.json(result)
    } catch(error) {
        console.error(error);
    }
}

export { insertDepartment, getAllDepartments }