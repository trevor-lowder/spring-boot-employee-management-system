import React, { useEffect, useState } from "react";
import {
  employeeList,
  Employee,
  deleteEmployee,
} from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { PlusIcon, PencilIcon, TrashIcon } from "@primer/octicons-react";

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = async () => {
    try {
      const response = await employeeList();
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching Employee data", err);
    }
  };

  const addEmployee = () => {
    navigate("/add-employee");
  };

  const editEmployee = (id: number | undefined) => {
    navigate(`/edit-employee/${id}`);
  };

  const removeEmployee = (id: number) => {
    deleteEmployee(id)
      .then(() => fetchEmployeeList())
      .catch((err) => console.error(err));
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
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: Employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td className="d-flex justify-content-center">
                <button
                  className="btn btn-outline me-2"
                  onClick={() => editEmployee(employee.id)}
                >
                  <PencilIcon size={24} />
                </button>
                <button
                  className="btn btn-outline ms-2"
                  onClick={() => removeEmployee(Number(employee.id))}
                >
                  <TrashIcon size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
