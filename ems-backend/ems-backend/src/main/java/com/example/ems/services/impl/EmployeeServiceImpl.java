package com.example.ems.services.impl;

import com.example.ems.dtos.EmployeeDto;
import com.example.ems.entities.Employee;
import com.example.ems.exceptions.ResourceNotFoundException;
import com.example.ems.mappers.EmployeeMapper;
import com.example.ems.repositories.EmployeeRepository;
import com.example.ems.services.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = validateEmployee(employeeId);
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employee) {
        Employee oldEmployee = validateEmployee(employeeId);
        oldEmployee.setFirstName(employee.getFirstName());
        oldEmployee.setLastName(employee.getLastName());
        oldEmployee.setEmail(employee.getEmail());

        Employee updatedEmployee = employeeRepository.save(oldEmployee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        validateEmployee(employeeId);

        employeeRepository.deleteById(employeeId);
    }

    private Employee validateEmployee(Long employeeId) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        return employee.orElseThrow(()->new ResourceNotFoundException(
                "Employee with ID "+employeeId+" does not exist"));
    }
}
