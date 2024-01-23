import React, { useEffect, useState } from "react";
import { employeeList, Employee } from "../services/EmployeeService";
import "../App.css"

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await employeeList();
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching Employee data", err);
      }
    };

    fetchEmployeeList();
  }, []);

  return (
    <div className="container d-flex flex-column mt-5 table-container table-hover">
      <h2 className="text-center">Employee List</h2>
      <table className="table table-striped table-bordered">
        <thead >
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">First Name</th>
            <th className="text-center">Last Name</th>
            <th className="text-center">Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
