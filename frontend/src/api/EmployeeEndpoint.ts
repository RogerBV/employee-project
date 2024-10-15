import Employee from "../entities/Employee";
import { BACKENDSERVER } from "../Utils";

const handleResponse = async (response: Response) => {
    if (response.ok) {
        return await response.json();
    } else {
        const errorMessage = await response.text();
        throw new Error(`Error: ${errorMessage || response.statusText}`);
    }
}

const getAllDepartments = async () => {
    try {
        const response = await fetch(BACKENDSERVER + 'GetAllDepartments');
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch departments:", error);
        return [];
    }
}

const getAllEmployees = async () => {
    try {
        const response = await fetch(BACKENDSERVER + 'GetAllEmployees');
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch employees:", error);
        return [];
    }
}

const insertEmployee = async (objEmployee: Employee) => {
    try {
        if (objEmployee.imageFile) {
            const formData = new FormData();
            formData.append('imageFile', objEmployee.imageFile);
            formData.append('firstName', objEmployee.firstName);
            formData.append('lastName', objEmployee.lastName);
            formData.append('address', objEmployee.address);
            formData.append('telephone', objEmployee.telephone);
            formData.append('departmentId', objEmployee.departmentId+"");
            formData.append('hireDate', objEmployee.hireDate);

            const response = await fetch(BACKENDSERVER + 'CreateEmployee', {
                method: 'PUT',
                body: formData
            });

            return await handleResponse(response);
        }
    } catch (error) {
        console.error("Failed to insert employee:", error);
        return null;
    }
}

const deleteEmployee = async (employeeId: number) => {
    try {
        const response = await fetch(BACKENDSERVER + 'DeleteEmployee', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employeeId: employeeId
            })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to delete employee:", error);
        return null;
    }
}

const getEmployeeDepartmentsByEmployee = async (employeeId) => {
    try {
        const response = await fetch(BACKENDSERVER + 'GetEmployeDepartmentLogsByEmployee?employeeId=' + employeeId);
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch employee departments:", error);
        return [];
    }
}

const updateEmployeeDepartment = async (employeeId, departmentId) => {
    try {
        const response = await fetch(BACKENDSERVER + 'updateEmployeeDepartment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: employeeId,
                departmentId: departmentId
            })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to update employee department:", error);
        return null; // Regresa null en caso de error
    }
}

const activateDeactivateEmployee = async (employeeId, employeeStatus) => {
    try {
        const response = await fetch(BACKENDSERVER + 'ActivateDeactivateEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: employeeId,
                status: parseInt(employeeStatus)
            })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to activate/deactivate employee:", error);
        return null;
    }
}

export { 
    getAllDepartments, 
    getAllEmployees, 
    insertEmployee, 
    deleteEmployee, 
    getEmployeeDepartmentsByEmployee, 
    updateEmployeeDepartment, 
    activateDeactivateEmployee 
}