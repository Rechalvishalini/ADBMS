package com.example.demo.Domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="food")
public class Foods {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="food_id")
    private int food_id;
    
    @Column(name = "food_name")
    private String food_name;
    
    @Column(name= "food_price")
    private float food_price;
    
    @Column(name = "food_image")
    private String food_image;
    
    @Column(name = "food_category")
    private String food_category;
    
    @Column(name = "food_desc")
    private String food_desc;
    
    public int getFood_id() {
    return food_id;
    }
    
    public void setFood_id(int food_id) {
    this.food_id = food_id;
    }
    
    public String getFood_name() {
    return food_name;
    }
    
    public void setFood_name(String food_name) {
    this.food_name = food_name;
    }
    
    public float getFood_price() {
    return food_price;
    }
    
    public void setFood_price(float food_price) {
    this.food_price = food_price;
    }
    
    public String getFood_image() {
    return food_image;
    }
    
    public void setFood_image(String food_image) {
    this.food_image = food_image;
    }
    
    public String getFood_category() {
    return food_category;
    }
    
    public void setFood_category(String food_category) {
    this.food_category = food_category;
    }
    
    public String getFood_desc() {
    return food_desc;
    }
    
    public void setFood_desc(String food_desc) {
    this.food_desc = food_desc;
    }
     
}
