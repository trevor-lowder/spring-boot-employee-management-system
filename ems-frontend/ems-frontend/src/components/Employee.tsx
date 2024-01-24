import React, { useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const Employee: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const saveEmployee = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    const employee: { firstName: string; lastName: string; email: string } = {
      firstName,
      lastName,
      email,
    };
    console.log(employee);
    createEmployee(employee).then((response) => {
      console.log(response.data);
      navigate("/employees");
    });
  };
  return (
    <div className="container ">
      <div className="row">
        <div
          className="card col-md-6 offset-md-3"
          style={{ marginTop: "8rem" }}
        >
          <h2 className="text-center mt-4">Add Employee</h2>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="firstname" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  placeholder="Employee First Name"
                  name="firstname"
                  value={firstName}
                  className="form-control"
                  onChange={(e: { target: { value: string } }): void =>
                    setFirstName(e.target.value)
                  }
                />
                <label htmlFor="lastname" className="form-label mt-4">
                  Last Name:
                </label>
                <input
                  type="text"
                  placeholder="Employee Last Name"
                  name="lastname"
                  value={lastName}
                  className="form-control"
                  onChange={(e: { target: { value: string } }): void =>
                    setLastName(e.target.value)
                  }
                />
                <label htmlFor="email" className="form-label mt-4">
                  Email:
                </label>
                <input
                  type="text"
                  placeholder="Employee Email"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={(e: { target: { value: string } }): void =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <button
                className="btn btn-success btn-lg mt-4 offset-lg-5"
                onClick={saveEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
