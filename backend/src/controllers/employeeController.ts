import { Request, Response } from "express"
import multer from "multer";
import Employee from "../entities/Employee";
import { activateDeactivateEmployeeDAO, deleteEmployeeDAO, getAllEmployeesDAO, getEmployeeByIdDAO, insertEmployeeDAO, updateEmployeeDAO } from "../dao/EmployeeDAO"

const upload = multer({ dest: 'uploads/' });

const insertEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const imageFile = request.file
        
        const filePath = 'http://'.concat(process.env.BACKEND_SERVER).concat(':').concat(process.env.BACKEND_PORT).concat('/').concat('uploads').concat('/').concat(imageFile.originalname)
        
        const objEmployee = request.body as Employee
        objEmployee.imageUrl = filePath

        const result = await insertEmployeeDAO(objEmployee)
        response.json(result)
    } catch(error) {
        console.error(error)
        response.sendStatus(500).json({ error: "Internal Server Error for insertEmployee" });
    }
}

const deleteEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const objEmployee = request.body as { employeeId }
        await deleteEmployeeDAO(objEmployee.employeeId)
        response.json(1)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const updateEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const objEmployee = request.body as Employee
        const result = await updateEmployeeDAO(objEmployee)
        response.json(result)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const getAllEmployees = async (request: Request, response: Response): Promise<void> => {
    try {
        const result = await getAllEmployeesDAO()
        response.json(result)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const getEmployeeById = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.query as { employeeId }
        const result = await getEmployeeByIdDAO(params.employeeId)
        response.json(result)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const activateDeactivateEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.body as { employeeId, status }
        
        const result = await activateDeactivateEmployeeDAO(params.employeeId, params.status)
        response.json(result)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

export { insertEmployee, updateEmployee, getAllEmployees, getEmployeeById, deleteEmployee, activateDeactivateEmployee }