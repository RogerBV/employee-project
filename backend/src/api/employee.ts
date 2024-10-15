import express from 'express'
import { insertEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, activateDeactivateEmployee } from '../controllers/employeeController'
import multer from 'multer';

const employeeRouter = express.Router()

const storageWay = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storageWay })

employeeRouter.route('/CreateEmployee')
    .put(upload.single('imageFile'), insertEmployee)

employeeRouter.route('/GetAllEmployees')
    .get(getAllEmployees)

employeeRouter.route('/GetEmployeeById')
    .get(getEmployeeById)

employeeRouter.route('/UpdateEmployee')
    .post(updateEmployee)

employeeRouter.route('/DeleteEmployee')
    .delete(deleteEmployee)

employeeRouter.route('/ActivateDeactivateEmployee')
    .post(activateDeactivateEmployee)

export { employeeRouter }