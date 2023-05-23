package com.example.demo.Domain;

import javax.persistence.Column;

public class Cart_Items {
    @Column(name="food_name")
    String food_name;

    @Column(name = "food_id")
    int food_id;


    public String getFood_name() {
        return this.food_name;
    }

    public void setFood_name(String food_name) {
        this.food_name = food_name;
    }

    public int getFood_id() {
        return this.food_id;
    }

    public void setFood_id(int food_id) {
        this.food_id = food_id;
    }

}
