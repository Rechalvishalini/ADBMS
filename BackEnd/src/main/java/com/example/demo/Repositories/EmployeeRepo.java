package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Domain.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer>{

    @Query(value="call getAllEmployees",nativeQuery = true)
    List<Object[]> getAllEmployees();

}

