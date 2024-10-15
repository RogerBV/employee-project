import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import multer from "multer";

const prisma = new PrismaClient()

const upload = multer({ dest: 'uploads/' });

const insertEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const imageFile = request.file
        
        const filePath = 'http://'.concat(process.env.BACKEND_SERVER).concat(':').concat(process.env.BACKEND_PORT).concat('/').concat('uploads').concat('/').concat(imageFile.originalname)
        const objEmployee = request.body as { firstName, lastName, departmentId, address, telephone, imageFile, hireDate }
    
        const result = await prisma.employee.create({
            data: {
                firstName: objEmployee.firstName,
                lastName: objEmployee.lastName,
                address: objEmployee.address,
                departmentId: parseInt(objEmployee.departmentId),
                telephone: objEmployee.telephone,
                imageUrl: filePath,
                hireDate: new Date(objEmployee.hireDate)
            }
        })

        const employeeId = result.id

        await prisma.employee_Department_Log.create({
            data: {
                employeeId: employeeId,
                departmentId: parseInt(objEmployee.departmentId)
            }
        })
        response.json(result)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" });
    }
}

const deleteEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const objEmployee = request.body as { employeeId }
        const result = await prisma.employee.update({
            where: {
                id: objEmployee.employeeId
            },
            data: {
                status: 0
            }
        })
        response.json(1)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const updateEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const objEmployee = request.body as { employeeId, firstName, lastName, address, telephone, imageUrl, departmentId }
        const result = await prisma.employee.update({
            where: {
                id: objEmployee.employeeId
            },
            data: {
                firstName: objEmployee.firstName,
                lastName: objEmployee.lastName,
                address: objEmployee.address,
                telephone: objEmployee.telephone,
                imageUrl: objEmployee.imageUrl,
                departmentId: objEmployee.departmentId
            }
        })
        response.json(result)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const getAllEmployees = async (request: Request, response: Response): Promise<void> => {
    try {
        const result = await prisma.employee.findMany({
            include: {
                department: true
            },
            where: {
                status:{
                    gt: 0
                }
            },
            orderBy: {
                id: 'asc'
            }
        })
        response.json(result)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const getEmployeeById = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.query as { employeeId }
        const result = await prisma.employee.findFirst({
            include: {
                employee_departments: {
                    include: {
                        department: true
                    }
                }
            }, 
            where: {
                id: parseInt(params.employeeId)
            }
        })
        response.json(result)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

const activateDeactivateEmployee = async (request: Request, response: Response): Promise<void> => {
    try {
        const params = request.body as { employeeId, status }
        
        const result = await prisma.employee.update({
            where: {
                id: params.employeeId
            },
            data: {
                status: params.status
            }
        })
        response.json(result)
    } catch(error) {
        response.sendStatus(500).json({ error: "Internal Server Error" })
    }
}

export { insertEmployee, updateEmployee, getAllEmployees, getEmployeeById, deleteEmployee, activateDeactivateEmployee }