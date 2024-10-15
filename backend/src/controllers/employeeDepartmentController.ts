import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const updateEmployeeDepartment = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.body as { employeeId, departmentId }
        const result = await prisma.employee.update({
            where: {
                id: params.employeeId
            },
            data: {
                departmentId: parseInt(params.departmentId)
            }
        })
        if (result) {
            await createNewEmployeeDepartmentLog(request, response)
        }
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const createNewEmployeeDepartmentLog = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.body as { employeeId, departmentId }
        const result = await prisma.employee_Department_Log.create({
            data: {
                employeeId: params.employeeId,
                departmentId: parseInt(params.departmentId),
            }
        })
        response.json(result)
    } catch (error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const getEmployeDepartmentLogsByEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.query as { employeeId }
        const result = await prisma.employee_Department_Log.findMany({
            include: {
                department: true
            },
            where: {
                employeeId: parseInt(params.employeeId)
            }
        })
        response.json(result)
    } catch (error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

export { createNewEmployeeDepartmentLog, updateEmployeeDepartment, getEmployeDepartmentLogsByEmployee }