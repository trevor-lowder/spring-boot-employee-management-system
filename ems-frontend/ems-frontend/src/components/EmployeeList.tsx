import React, { useEffect, useState } from "react";
import { employeeList, Employee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { PlusIcon } from "@primer/octicons-react";

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

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

  const addEmployee = () => {
    navigate("/add-employee");
  };

  return (
    <div className="container d-flex flex-column mt-5 table-container table-hover">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h2 style={{ marginLeft: "525px" }}>Employee List</h2>
        <button
          className="btn btn-primary btn-lg"
          style={{
            marginRight: "100px",
            backgroundColor: "black",
            border: "none",
          }}
          type="button"
          onClick={addEmployee}
        >
          <PlusIcon size={32} />
        </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
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
