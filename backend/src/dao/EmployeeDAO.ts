import Employee from "../entities/Employee";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const insertEmployeeDAO = async (objEmployee: Employee) => {
    const result = await prisma.employee.create({
        data: {
            firstName: objEmployee.firstName,
            lastName: objEmployee.lastName,
            address: objEmployee.address,
            departmentId: objEmployee.departmentId,
            telephone: objEmployee.telephone,
            imageUrl: objEmployee.imageUrl,
            hireDate: new Date(objEmployee.hireDate)
        }
    })

    const employeeId = result.id

    await prisma.employee_Department_Log.create({
        data: {
            employeeId: employeeId,
            departmentId: objEmployee.departmentId
        }
    })
    return result;
}

const deleteEmployeeDAO = async (employeeId) => {
    const result = await prisma.employee.update({
        where: {
            id: employeeId
        },
        data: {
            status: 0
        }
    })
    return result;
}

const updateEmployeeDAO = async (objEmployee: Employee) => {
    const result = await prisma.employee.update({
        where: {
            id: objEmployee.id
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
    return result
}

const getAllEmployeesDAO = async () => {
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
    return result;
}

const getEmployeeByIdDAO = async (employeeId) => {
    const result = await prisma.employee.findFirst({
        include: {
            employee_departments: {
                include: {
                    department: true
                }
            }
        }, 
        where: {
            id: parseInt(employeeId)
        }
    })
    return result;
}

const activateDeactivateEmployeeDAO = async (employeeId, status) => {
    const result = await prisma.employee.update({
        where: {
            id: employeeId
        },
        data: {
            status: status
        }
    })
    return result;
}

const updateEmployeeDepartmentDAO = async (employeeId, departmentId) => {
    const result = await prisma.employee.update({
        where: {
            id: employeeId
        },
        data: {
            departmentId: departmentId
        }
    })
    return result;
}
export { insertEmployeeDAO, deleteEmployeeDAO, updateEmployeeDAO, getAllEmployeesDAO, getEmployeeByIdDAO, activateDeactivateEmployeeDAO, updateEmployeeDepartmentDAO } 