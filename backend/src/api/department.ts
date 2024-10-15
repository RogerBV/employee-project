import express from 'express'
import { insertDepartment, getAllDepartments } from "../controllers/departmentController";

const departmentRouter = express.Router()

departmentRouter.route('/insertDepartment')
    .put(insertDepartment)

departmentRouter.route('/GetAllDepartments')
    .get(getAllDepartments)

export { departmentRouter }
