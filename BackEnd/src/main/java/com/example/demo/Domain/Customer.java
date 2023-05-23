package com.example.demo.Domain;

import java.sql.Date;

import javax.persistence.*;


@Entity
@Table(name = "customer")

public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="cus_id")
    private int id;

    @Column(name="cus_name")
    private String cus_name;

    @Column(name ="cus_phone")
    private int phone;

    @Column(name ="cus_address")
    private String address;

    @Column(name ="cus_email")
    private String email;

    @Column(name ="cus_nic")
    private String nic;

    @Column(name ="cus_gender")
    private String gender;

    @Column(name ="cus_dob")
    private Date dob; 


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getCus_name() {
        return this.cus_name;
    }

    public void setCus_name(String cus_name) {
        this.cus_name = cus_name;
    }

    public int getPhone() {
        return this.phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNic() {
        return this.nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getGender() {
        return this.gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return this.dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }
   

}
