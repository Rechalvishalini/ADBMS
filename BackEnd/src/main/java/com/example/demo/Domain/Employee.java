package com.example.demo.Domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
					
@Entity
@Table(name="employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="emp_id")
    private int emp_id;
    
    @Column(name = "emp_name")
    private String emp_name;
    
    @Column(name= "emp_age")
    private float emp_age;
    
    @Column(name = "emp_gender")
    private String emp_gender;
    
    @Column(name = "emp_doj")
    private String emp_doj;
    
    @Column(name = "emp_position")
    private String emp_position;

    @Column(name = "emp_address")
    private String emp_address;

    public int getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(int emp_id) {
        this.emp_id = emp_id;
    }

    public String getEmp_name() {
        return emp_name;
    }

    public void setEmp_name(String emp_name) {
        this.emp_name = emp_name;
    }

    public float getEmp_age() {
        return emp_age;
    }

    public void setEmp_age(float emp_age) {
        this.emp_age = emp_age;
    }

    public String getEmp_gender() {
        return emp_gender;
    }

    public void setEmp_gender(String emp_gender) {
        this.emp_gender = emp_gender;
    }

    public String getEmp_doj() {
        return emp_doj;
    }

    public void setEmp_doj(String emp_doj) {
        this.emp_doj = emp_doj;
    }

    public String getEmp_position() {
        return emp_position;
    }

    public void setEmp_position(String emp_position) {
        this.emp_position = emp_position;
    }

    public String getEmp_address() {
        return emp_address;
    }

    public void setEmp_address(String emp_address) {
        this.emp_address = emp_address;
    }

    
}
