import { deleteEmployee } from '../api/EmployeeEndpoint';
import { calculateDifference } from '../Utils'
import { useRef } from "react";
import { formatDate } from '../Utils';
import Employee from '../entities/Employee';
import EmployeeDetailModalContainer from './EmployeeDetailModalContainer';


interface EmployeeCardComponentProps {
    objEmployee: Employee;
    listEmployees: () => Promise<void>;
}

const EmployeeCardComponent = ({ objEmployee, listEmployees }: EmployeeCardComponentProps) => {
    const childRef = useRef(null);

    const removeEmployee = async (employeeId: number) => {
        await deleteEmployee(employeeId)
        await listEmployees()
    }

    const openModal = () => {
        if (childRef.current) {
            childRef.current.openEmployeeDetailView();
          }
    }

    return (
        <div className='card'>
            <div className='row'>
                <div className='col-2'>
                    <img src={ objEmployee.imageUrl} width={150} height={150} />
                </div>
                <div className='col-6'>
                    <div className='row g-7'>
                        <div className='col-4 fw-bold'>
                            { objEmployee.firstName + ' ' + objEmployee.lastName }
                        </div>
                        <div className='col-4'>
                            {
                                ' (' + objEmployee.department.departmentName + ')' 
                            }
                        </div>
                    </div>
                    <div className='row fw-bold'>
                        Hire Date
                    </div>
                    <div className='row'>
                        {
                            formatDate(objEmployee.hireDate) + ' (' + calculateDifference(objEmployee.hireDate) + ')'
                        }
                    </div>
                </div>
                <div className='col-1'></div>
                <div className='col-2'>
                    <input type="button" className='btn btn-success' value="View Details" onClick={() => openModal()} />
                </div>
                <div className='col-1'>
                    <svg onClick={(e) => {removeEmployee(objEmployee.id)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                    </svg>
                </div>
            </div>
            <EmployeeDetailModalContainer 
                ref={childRef}
                objEmployeeParam={objEmployee}
                onListEmployees={listEmployees}
            />
            
        </div>
    )
}

export default EmployeeCardComponent