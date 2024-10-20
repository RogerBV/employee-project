import Department from "./Department";
import Employee from "./Employee";

interface Employee_Department_Log {
    id: number;
    employeeId: number;
    employee: Employee;
    logDate: string;
    departmentId: number;
    department: Department | null;
}

export default Employee_Department_Log;