import { useState, useEffect } from "react";
import EmployeeCardComponent from "./EmployeeCardComponent";
import Employee from "../entities/Employee";
import { getAllDepartments, getAllEmployees, insertEmployee } from "../api/EmployeeEndpoint";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Department from "../entities/Department";


const EmployeesComponent = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [telephone, setTelephone] = useState('')
    const [hireDate, setHireDate] = useState(() => {
        const today = new Date().toISOString().split('T')[0];
        return today;
      });
    const [employees, setEmployees] = useState<Employee[]>([])
    const [deparments, setDepartments] = useState<Department[]>([])
    const [selectedDepartment, setSelectedDepartment] = useState(0)
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null> (null);
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const imageSrc = URL.createObjectURL(file);
          setImageUrl(imageSrc);
          setImageFile(file)
        }
    };

    const fetchAllEmployees = async () => {
        const result = await getAllEmployees();
        setEmployees(result)
    }

    const fetchAllDepartments = async () => {
        const result = await getAllDepartments();
        setDepartments(result)
    }

    const validateForm = () => {
        if (!firstName || !lastName || !address || !telephone || !hireDate || selectedDepartment === 0) {
            setErrorMessage('All fields are required.');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const saveEmployee = async () => {
        if (!validateForm()) return;
        const objEmployee: Employee = {
            id: 0,
            firstName,
            lastName,
            address,
            telephone,
            imageUrl: imageUrl || '',
            departmentId: selectedDepartment,
            department: {} as Department,
            hireDate,
            imageFile,
            status: 1
        }
        const result = await insertEmployee(objEmployee)
        if (Number(result.id) > 0) {
            openCloseEmployeeModal();
            fetchAllEmployees();
        } else {
            console.log('Error while the application try to save an employee.');
        }
    }

    const openCloseEmployeeModal = () => {
        if (showModal == false){
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }

    useEffect(() => {
        fetchAllDepartments();
        fetchAllEmployees()
    }, [])

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-10"></div>
                <div className="col-2">
                    <input type="button" className="btn btn-success" onClick={() => {openCloseEmployeeModal()}} value={"New Employee"} />
                </div>
            </div>
            {
                employees.map((element: Employee) => {
                    return <EmployeeCardComponent key={element.id} listEmployees={fetchAllEmployees} objEmployee={element} />
                })            
            }

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="row mb-3">
                        <div className="col-3">
                            <label className="form-label">Avatar</label>
                        </div>
                        <div className="col-7">
                            <input className="form-control" accept="image/*" type="file" id="formFile" onChange={(e) => handleImageUpload(e)}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            First Name
                        </div>
                        <div className="col-7">
                            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            Last Name
                        </div>
                        <div className="col-7">
                            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-3">
                            Address
                        </div>
                        <div className="col-7">
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-3">
                            Telephone
                        </div>
                        <div className="col-7">
                            <input type="text" className="form-control" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            Department:
                        </div>
                        <div className="col-7">
                            <select className="form-select" value={selectedDepartment} onChange={(e)  => setSelectedDepartment(Number(e.target.value))}>
                                <option value={0}>Select an Department</option>
                                {                                            
                                    deparments.map((element: Department) => {
                                        return (
                                            <option key={parseInt(element.id)} value={parseInt(element.id)}>{element.departmentName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            Hire Date:
                        </div>
                        <div className="col-7">
                            <input type="date" className="form-control" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveEmployee()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EmployeesComponent