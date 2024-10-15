import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Employee from '../entities/Employee';
import { formatDate, calculateDifference } from '../Utils';
import Department from '../entities/Department';
import Employee_Department_Log from '../entities/Employee_Department_Log';


interface EmployeeDetailModalProps {
    objEmployeeParam: Employee
    showModalParam: boolean
    employeeStatusParam: number;
    selectedDepartmentParam: number;
    departmentsParam: Department[];
    employeeDepartmentsLogsParam: Employee_Department_Log[];
    onSelectedDepartment: (value: number) => Promise<void>;
    onHandleClose: () => Promise<void>;
    onUpdateEmployeStatus: (newStatus: number) => Promise<void>;
    onUpdateDepartment: () => Promise<void>;
}

const EmployeeDetailModalPresenter = ({ 
    objEmployeeParam, 
    showModalParam, 
    employeeStatusParam, 
    departmentsParam,
    selectedDepartmentParam, 
    employeeDepartmentsLogsParam,
    onSelectedDepartment, 
    onHandleClose, 
    onUpdateEmployeStatus,
    onUpdateDepartment
}: EmployeeDetailModalProps) => {
    return (
        <Modal size='lg' show={showModalParam} onHide={onHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row mb-3'>
                        <div className='col-3'>
                            <img src={objEmployeeParam.imageUrl} width={150} height={150} />
                        </div>
                        <div className='col-8'>
                            <div className='row'>
                                <div className='col-4 fw-bold'>
                                    { objEmployeeParam.firstName + ' ' + objEmployeeParam.lastName }
                                </div>
                                <div className='col-4'></div>
                                <div className='col-4 fw-bold'>Hire Date</div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>
                                    Employee ID: { objEmployeeParam.id }
                                </div>
                                <div className='col-4'></div>
                                <div className='col-4'> { formatDate(objEmployeeParam.hireDate) } </div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>
                                    Department: { objEmployeeParam.department.departmentName }
                                </div>
                                <div className='col-4'></div>
                                <div className='col-4'> { calculateDifference(objEmployeeParam.hireDate) } </div>
                            </div>
                            <div className='row'>
                                <div className='col-9'>
                                    Telephone: { objEmployeeParam.telephone }
                                </div>
                                <div className='col-3'>
                                    {(employeeStatusParam == 1) && (<input type='button' className='btn btn-danger' value={"Deactivate"} onClick={() => { onUpdateEmployeStatus(2) }} />)}
                                    
                                    {(employeeStatusParam == 2) && (<input type='button' className='btn btn-success' value={"Activate"} onClick={() => { onUpdateEmployeStatus(1) }} />)}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-9'>
                                    Address: { objEmployeeParam.address }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-9 fw-bold'>
                                    Update Department
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-5'>
                                    <select className='form-select' value={selectedDepartmentParam} onChange={(e)  => onSelectedDepartment(parseInt(e.target.value))}>
                                        {
                                            departmentsParam.map((element: Department) => {
                                                return (
                                                    <option key={element.id} value={parseInt(element.id)}>{element.departmentName}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <input type='button' className='btn btn-success' value={"Update"} onClick={() => {onUpdateDepartment()}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <label className='fw-bold'>Deparment History</label>
                    <div className='row'>
                        <table className='table table-success'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                                
                            <tbody>
                                {
                                    employeeDepartmentsLogsParam.map((element: Employee_Department_Log) => {
                                        return (
                                            <tr key={element.id}>
                                                <td>{formatDate(element.logDate)}</td>
                                                <td>{element.department?.departmentName}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
    )
}

export default EmployeeDetailModalPresenter