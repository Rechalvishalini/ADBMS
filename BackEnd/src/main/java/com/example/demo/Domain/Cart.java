package com.example.demo.Domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="item_id")
    private int item_id;

    @Column(name="food_id")
    private int food_id;

    @Column(name="cus_id")
    private int cus_id;

    @Column(name="quantity")
    private int quantity;

    @Column(name="price")
    private float price;


    public int getItem_id() {
        return this.item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public int getFood_id() {
        return this.food_id;
    }

    public void setFood_id(int food_id) {
        this.food_id = food_id;
    }

    public int getCus_id() {
        return this.cus_id;
    }

    public void setCus_id(int cus_id) {
        this.cus_id = cus_id;
    }


    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getPrice() {
        return this.price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
    

    
}
