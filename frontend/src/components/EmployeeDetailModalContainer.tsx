import { useImperativeHandle, useState, forwardRef } from 'react'
import Employee_Department_Log from '../entities/Employee_Department_Log';
import Employee from '../entities/Employee';
import EmployeeDetailModalPresenter from './EmployeeDetailModalPresenter';
import { activateDeactivateEmployee, getAllDepartments, getEmployeeDepartmentsByEmployee, updateEmployeeDepartment } from '../api/EmployeeEndpoint';

interface EmployeeDetailModalContainerProps {
    objEmployeeParam: Employee
    onListEmployees: () => Promise<void>;
}

const EmployeeDetailModalContainer = forwardRef(({ objEmployeeParam, onListEmployees }: EmployeeDetailModalContainerProps, ref) => {
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false);
    const [selectedDepartment, setSelectedDepartment] = useState(0)
    const [employeeDepartmentsLogs, setEmployeeDepartmentsLogs] = useState<Employee_Department_Log[]>([])
    const [employeeStatus, setEmployeeStatus] = useState<number>(objEmployeeParam.status);
    const [departments, setDepartments] = useState([])

    const updateEmployeeStatus = async (status: number) => {
        const objE = await activateDeactivateEmployee(objEmployeeParam.id, status)
        setEmployeeStatus(objE.status)
    }

    const updateDepartment = async () => {
        const result = await updateEmployeeDepartment(objEmployeeParam.id, selectedDepartment)
        if(result.id > 0) {
            onListEmployees()
            fetchEmployeeDepartmentsLogs()
        }
    }

    useImperativeHandle(ref, () => ({
        openEmployeeDetailView () {
            setShowModal(true)
            fetchAllDepartments()
            fetchEmployeeDepartmentsLogs()
            setSelectedDepartment(objEmployeeParam.departmentId)
        }
    }))

    const fetchEmployeeDepartmentsLogs = async () => {
        const result = await getEmployeeDepartmentsByEmployee(objEmployeeParam.id)
        setEmployeeDepartmentsLogs(result)
    }

    const fetchAllDepartments = async () => {
        const result = await getAllDepartments()
        setDepartments(result)
    }

    return (
        <EmployeeDetailModalPresenter 
            objEmployeeParam={objEmployeeParam} 
            showModalParam={showModal}
            employeeStatusParam={employeeStatus}
            selectedDepartmentParam={selectedDepartment}
            departmentsParam={departments}
            employeeDepartmentsLogsParam={employeeDepartmentsLogs}
            onSelectedDepartment={async (value: number) => {
                setSelectedDepartment(value);
            }}
            onHandleClose={async () => {
                    handleClose()
                }
            }
            onUpdateEmployeStatus={async (val1: number) => {
                updateEmployeeStatus(val1)
            }}
            onUpdateDepartment={updateDepartment}
        />
    )
})

export default EmployeeDetailModalContainer