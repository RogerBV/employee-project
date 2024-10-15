import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
const prisma = new PrismaClient()

const getAllDepartments = async (request: Request, response: Response): Promise<void> => {
    try {
        const result = await prisma.department.findMany()
        response.json(result)
    } catch(error) {
        console.error(error)
    }
}

const insertDepartment = async (request: Request, response: Response): Promise<void> => {
    try {
        const objDepartment = request.query as { departmentName }
        const result = await prisma.department.create({
            data: {
                departmentName: objDepartment.departmentName
            }
        })
        response.json(result)
    } catch(error) {
        console.error(error);
    }
}

export { insertDepartment, getAllDepartments }