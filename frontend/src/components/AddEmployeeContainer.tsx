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
                        setFirstName(value)
                    }
                } 
                lastNameParam={lastName} 
                onLastName={
                    async(value: string) => {
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
                        setSelectedDepartment(value)
                    }
                }
                errorMessageParam={errorMessage}
                onSaveEmployee={
                    async () => {
                        saveEmployee()
                    }
                }
                
            />
        </>
    )
}

export default AddEmployeeContainer