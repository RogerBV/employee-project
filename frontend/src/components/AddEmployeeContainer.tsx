import { useState, useEffect } from "react"
import AddEmployeePresenter from "./AddEmployeePresenter"
import { getAllDepartments, insertEmployee } from "../api/EmployeeEndpoint"
import Department from "../entities/Department"
import Employee from "../entities/Employee"

interface AddEmployeeContainerProps {
    onEmployeeList: () => Promise<void>
}

const AddEmployeeContainer = ({ onEmployeeList }: AddEmployeeContainerProps) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [telephone, setTelephone] = useState('')
    const [deparments, setDepartments] = useState<Department[]>([])
    const handleClose = () => setShowModal(false);
    const [hireDate, setHireDate] = useState(() => {
        const today = new Date().toISOString().split('T')[0];
        return today;
      });
    const [showModal, setShowModal] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')
    const [imageFile, setImageFile] = useState<File | null> (null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [validFirstName, setValidFirstName] = useState(false)
    const [validLastName, setValidLastName] = useState(false)
    const [validTelephoneNumber, setValidTelephoneNumber] = useState(false)
    const [validSelectedDepartment, setValidSelectedDepartment] = useState(false)
    const [validAddress, setValidAddress] = useState(true) 
    const regularExpression = "^[A-Z][a-z]*$";
    const addressRegularExpression = "^[A-Z][a-z 0-9 ]*$";
    const telephoneNumberRegularExpression = "^[0-9]{9}$";

    const cleanForm = () => {
        setFirstName('')
        setLastName('')
        setAddress('')
        setTelephone('')
        setSelectedDepartment(0)
        setHireDate('')
        setImageFile(null)
    }

    const validateForm = () => {
        if (!firstName || !lastName || !address || !telephone || !hireDate || selectedDepartment === 0 || !imageFile ) {
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
            onEmployeeList()
        } else {
            console.log('Error while the application try to save an employee.');
        }
    }

    const openCloseEmployeeModal = () => {
        if (showModal == false){
            cleanForm()
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }

    const fetchAllDepartments = async () => {
        const result = await getAllDepartments();
        setDepartments(result)
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const imageSrc = URL.createObjectURL(file);
          setImageUrl(imageSrc);
          setImageFile(file)
        }
    };

    useEffect(() => {
        fetchAllDepartments()
    }, [])

    return (
        <>
            <AddEmployeePresenter 
                onHandleImageUpload={
                    async(e) => {
                        handleImageUpload(e)
                    }
                }
                showModalParam={showModal} 
                onHandleClose={
                    async() => {
                        handleClose()
                    }
                    
                }
                onOpenCloseEmployeeModal={openCloseEmployeeModal} 
                deparmentsParam={deparments}
                firstNameParam={firstName}
                onFirstName={
                    async(value: string) => {
                        var regex = new RegExp(regularExpression)
                        const result = regex.test(value)
                        setValidFirstName(result)
                        setFirstName(value)
                    }
                } 
                lastNameParam={lastName} 
                onLastName={
                    async(value: string) => {
                        var regex = new RegExp(regularExpression)
                        const result = regex.test(value)
                        setValidLastName(result)
                        setLastName(value)
                    }
                }
                addressParam={address} 
                onAddress={
                    async(value: string) => {
                        setAddress(value)
                    }
                }
                telephoneParam={telephone}
                onTelephone={
                    async(value: string) => {
                        var regex = new RegExp(telephoneNumberRegularExpression)
                        const result = regex.test(value)
                        setValidTelephoneNumber(result)
                        setTelephone(value)
                    }
                }
                hireDateParam={hireDate}
                onHireDate={
                    async(val: string) => {
                        setHireDate(val)
                    }
                }
                selectedDepartmentParam={selectedDepartment}
                onSelectedDepartment={
                    async(value: number) => {
                        if (value == 0) {
                            setValidSelectedDepartment(false)
                        } else {
                            setValidSelectedDepartment(true)
                        }
                        setSelectedDepartment(value)
                    }
                }
                errorMessageParam={errorMessage}
                onSaveEmployee={
                    async () => {
                        saveEmployee()
                    }
                }
                validFirstNameParam={validFirstName}
                validLastNameParam={validLastName}
                validTelephoneNumberParam={validTelephoneNumber}
                validSelectedDeparmentParam={validSelectedDepartment}
                validAddressParam={validAddress}
            />
        </>
    )
}

export default AddEmployeeContainer