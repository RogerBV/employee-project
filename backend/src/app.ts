import express from 'express';
import cors from 'cors'
import { employeeRouter } from './api/employee'
import { departmentRouter } from './api/department';
import { employeeDepartmentLogRouter } from './api/employeeDepartmentLog';
import path from 'path';

const app = express();
const port = process.env.BACKEND_PORT

const router = express.Router()

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))
app.use(express.json())
router.use(departmentRouter)
router.use(employeeRouter)
router.use(employeeDepartmentLogRouter)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(router)

app.listen(port, () => {
    return console.log("Express is listen on port " + port);
})

module.exports = app;