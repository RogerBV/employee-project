import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { createNewEmployeeDepartmentLogDAO, getEmployeDepartmentLogsByEmployeeDAO } from "../dao/EmployeeDepartmentLogDAO"
import Employee_Department_Log from "../entities/Employee_Department_Log"
import { updateEmployeeDepartmentDAO } from "../dao/EmployeeDAO"

const prisma = new PrismaClient()

const updateEmployeeDepartment = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.body as { employeeId, departmentId }
        const result = await updateEmployeeDepartmentDAO(params.employeeId, params.departmentId);
        if (result) {
            await createNewEmployeeDepartmentLog(request, response)
        }
    } catch(error) {
        response.status(500).json({ error: "Internal Server Error" })
    }
}

const createNewEmployeeDepartmentLog = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.body as Employee_Department_Log
        const result = await createNewEmployeeDepartmentLogDAO(params)
        response.json(result)
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" })
    }
}

const getEmployeDepartmentLogsByEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.query as { employeeId }
        const result = await getEmployeDepartmentLogsByEmployeeDAO(params.employeeId)
        response.json(result)
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" })
    }
}

export { createNewEmployeeDepartmentLog, updateEmployeeDepartment, getEmployeDepartmentLogsByEmployee }