import React, { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
}

const Employee: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    id &&
      getEmployee(Number(id))
        .then(
          (response: {
            data: {
              firstName: React.SetStateAction<string>;
              lastName: React.SetStateAction<string>;
              email: React.SetStateAction<string>;
            };
          }) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
          }
        )
        .catch((error) => console.error(error));
  }, [id]);

  const saveEmployee = (e: { preventDefault: () => void }): void => {
    e.preventDefault();

    const employee: Employee = {
      firstName,
      lastName,
      email,
    };
    validateForm() &&
      (id
        ? updateEmployee(Number(id), employee)
            .then((): void => {
              navigate("/employees");
            })
            .catch((error) => console.error(error))
        : createEmployee(employee)
            .then((): void => {
              navigate("/employees");
            })
            .catch((error) => console.error(error)));
  };

  const validateForm = () => {
    let isValid = true;
    const errorsCopy = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      isValid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      isValid = false;
    }
    if (email.trim() && emailRegex.test(email)) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Valid email is required";
      isValid = false;
    }

    setErrors(errorsCopy);

    return isValid;
  };

  return (
    <div className="container ">
      <div className="row">
        <div
          className="card col-md-6 offset-md-3"
          style={{ marginTop: "8rem" }}
        >
          {id ? (
            <h2 className="text-center mt-4">Update Employee</h2>
          ) : (
            <h2 className="text-center mt-4">Add Employee</h2>
          )}

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
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e: { target: { value: string } }): void =>
                    setFirstName(e.target.value)
                  }
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
                <label htmlFor="lastname" className="form-label mt-4">
                  Last Name:
                </label>
                <input
                  type="text"
                  placeholder="Employee Last Name"
                  name="lastname"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e: { target: { value: string } }): void =>
                    setLastName(e.target.value)
                  }
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
                <label htmlFor="email" className="form-label mt-4">
                  Email:
                </label>
                <input
                  type="text"
                  placeholder="Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e: { target: { value: string } }): void =>
                    setEmail(e.target.value)
                  }
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
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
