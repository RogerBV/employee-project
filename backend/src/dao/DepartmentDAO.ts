import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getAllDepartmentsDAO = async () => {
    const result = await prisma.department.findMany()
    return result;
}

const insertDepartmentDAO = async (departmentName) => {
    const result = await prisma.department.create({
        data: {
            departmentName: departmentName
        }
    })
    return result;
}

export { getAllDepartmentsDAO, insertDepartmentDAO }