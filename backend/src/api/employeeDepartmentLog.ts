import express from 'express'
import { createNewEmployeeDepartmentLog, updateEmployeeDepartment, getEmployeDepartmentLogsByEmployee } from '../controllers/employeeDepartmentController'

const employeeDepartmentLogRouter = express.Router()

employeeDepartmentLogRouter.route('/CreateNewEmployeeDepartmentLog')
    .put(createNewEmployeeDepartmentLog)

employeeDepartmentLogRouter.route('/updateEmployeeDepartment')
    .post(updateEmployeeDepartment)

employeeDepartmentLogRouter.route('/GetEmployeDepartmentLogsByEmployee')
    .get(getEmployeDepartmentLogsByEmployee)


export { employeeDepartmentLogRouter }