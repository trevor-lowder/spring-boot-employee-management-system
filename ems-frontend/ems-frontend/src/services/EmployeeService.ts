import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8088/api/employees';

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export const employeeList = () => axios.get<Employee[]>(REST_API_BASE_URL);