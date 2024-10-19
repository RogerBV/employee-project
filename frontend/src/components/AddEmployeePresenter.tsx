import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Department from '../entities/Department';

interface AddEmployeePresenterProps {
    showModalParam: boolean
    onHandleClose: () => Promise<void>
    deparmentsParam: Department[],
    firstNameParam: string
    onFirstName: (val: string) => Promise<void>
    lastNameParam: string
    onLastName: (val: string) => Promise<void>
    addressParam: string
    onAddress: (val: string) => Promise<void>
    telephoneParam: string
    onTelephone: (val: string) => Promise<void>
    hireDateParam: string
    onHireDate: (val: string) => Promise<void>
    selectedDepartmentParam: number
    onSelectedDepartment: (val: number) => Promise<void>
    errorMessageParam: string
    onOpenCloseEmployeeModal: () => void
    onHandleImageUpload: (e) => Promise<void>
    onSaveEmployee: () => Promise<void>
    validFirstNameParam: boolean
    validLastNameParam: boolean
    validTelephoneNumberParam: boolean
}

const AddEmployeePresenter = ({ 
    showModalParam, 
    onHandleClose, 
    deparmentsParam,
    firstNameParam, onFirstName, 
    lastNameParam, onLastName, 
    addressParam, onAddress, 
    telephoneParam, onTelephone, 
    hireDateParam, 
    onHireDate, 
    selectedDepartmentParam, 
    onSelectedDepartment,
    errorMessageParam,
    onOpenCloseEmployeeModal,
    onHandleImageUpload,
    onSaveEmployee,
    validFirstNameParam,
    validLastNameParam,
    validTelephoneNumberParam
}: AddEmployeePresenterProps) => {
    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-10"></div>
                <div className="col-2">
                    <input type="button" className="btn btn-success" onClick={() => {onOpenCloseEmployeeModal()}} value={"New Employee"} />
                </div>
            </div>

            <Modal show={showModalParam} onHide={onHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessageParam && <div className="alert alert-danger">{errorMessageParam}</div>}
                    <div className="row mb-3">
                        <div className="col-3">
                            <label className="form-label">Avatar</label>
                        </div>
                        <div className="col-7">
                            <input className="form-control" accept="image/*" type="file" id="formFile" onChange={(e) => onHandleImageUpload(e)}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            First Name
                        </div>
                        <div className="col-7">
                            <input type="text" className={validFirstNameParam ? 'form-control is-valid' : 'form-control is-invalid'} value={firstNameParam} onChange={(e) => onFirstName(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            Last Name
                        </div>
                        <div className="col-7">
                            <input type="text" className={validLastNameParam ? 'form-control is-valid' : 'form-control is-invalid'} value={lastNameParam} onChange={(e) => onLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-3">
                            Address
                        </div>
                        <div className="col-7">
                            <input type="text" className="form-control" value={addressParam} onChange={(e) => onAddress(e.target.value)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-3">
                            Telephone
                        </div>
                        <div className="col-7">
                            <input type="text" className={validTelephoneNumberParam ? 'form-control is-valid' : 'form-control is-invalid'} value={telephoneParam} onChange={(e) => onTelephone(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            Department:
                        </div>
                        <div className="col-7">
                            <select className="form-select" value={selectedDepartmentParam} onChange={(e)  => onSelectedDepartment(Number(e.target.value))}>
                                <option value={0}>Select an Department</option>
                                {                                            
                                    deparmentsParam.map((element: Department) => {
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
                            <input type="date" className="form-control" value={hireDateParam} onChange={(e) => onHireDate(e.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHandleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onSaveEmployee()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddEmployeePresenter