import Department from "./Department";

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    telephone: string;
    imageUrl: string;
    departmentId: string;
    department: Department;
    hireDate: string;
    imageFile: File | null;
    status: number;
}

export default Employee