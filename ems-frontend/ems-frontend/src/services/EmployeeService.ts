import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8088/api/employees';

export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
}

export const employeeList = () => axios.get<Employee[]>(REST_API_BASE_URL);

export const createEmployee = (employee: Employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployee = (employeeId: number) => axios.get(`${REST_API_BASE_URL}/${employeeId}`);

export const updateEmployee = (employeeId: number, employee: Employee) => axios.patch(`${REST_API_BASE_URL}/${employeeId}`, employee);