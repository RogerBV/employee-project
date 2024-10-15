import { useState, useEffect } from 'react'
import Employee from '../entities/Employee';
import { getAllEmployees } from '../api/EmployeeEndpoint';
import EmployeesPresenter from './EmployeesPresenter';
import AddEmployeeContainer from './AddEmployeeContainer';

const EmployeeContainer = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = async () => {
        try {
            const data = await getAllEmployees();
            setEmployees(data);
        } catch (err) {
            setError('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div>
            <div className='row'>
                <AddEmployeeContainer onEmployeeList={fetchEmployees} />
            </div>
            <div className='row'>
                <EmployeesPresenter employees={employees} onListEmployees={fetchEmployees} />
            </div>
            
        </div>
    );
};

export default EmployeeContainer;