import Employee from '../entities/Employee'
import EmployeeCardComponent from './EmployeeCardComponent'

interface EmployeeListProps {
    employees: Employee[]
    onListEmployees: () => Promise<void>;
}

const EmployeesPresenter = ({ employees, onListEmployees }: EmployeeListProps) => {
    return (
        employees.map((element: Employee) => {
            return <EmployeeCardComponent key={element.id} objEmployee={element} listEmployees={onListEmployees}  />
        })
    )
    
}

export default EmployeesPresenter