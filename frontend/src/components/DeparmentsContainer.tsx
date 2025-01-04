import { getAllDepartments } from "../api/EmployeeEndpoint"

const DepartmentsContainer = () => {
    const fetchDepartments = async () => {
        const data = await getAllDepartments()
        
    }
    return (
        <div>Departments Container</div>
    )
}

export default DepartmentsContainer