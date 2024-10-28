import { PrismaClient } from "@prisma/client"
import Employee_Department_Log from "../entities/Employee_Department_Log"
const prisma = new PrismaClient()

const createNewEmployeeDepartmentLogDAO = async (objEmployeeDepartmentLog: Employee_Department_Log) => {
    const result = await prisma.employee_Department_Log.create({
        data: {
            employeeId: objEmployeeDepartmentLog.employeeId,
            departmentId: objEmployeeDepartmentLog.departmentId,
        }
    })
    return result
}

const getEmployeDepartmentLogsByEmployeeDAO = async (employeeId) => {
    const result = await prisma.employee_Department_Log.findMany({
        include: {
            department: true
        },
        where: {
            employeeId: parseInt(employeeId)
        }
    })
    return result
}

export { createNewEmployeeDepartmentLogDAO, getEmployeDepartmentLogsByEmployeeDAO }