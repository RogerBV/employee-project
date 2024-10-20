import { Request, Response } from "express"
import { getAllDepartmentsDAO, insertDepartmentDAO } from "../dao/DepartmentDAO"

const getAllDepartments = async (request: Request, response: Response): Promise<void> => {
    try {
        const result = await getAllDepartmentsDAO()
        response.json(result)
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