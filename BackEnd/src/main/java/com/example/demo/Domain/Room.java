package com.example.demo.Domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="room_id")
    private String room_id;

    @Column(name="Booking_status")
    private String Booking_status;

    @Column(name="room_occupancy")
    private int room_occupancy;

    @Column(name="room_description")
    private int room_description;

    public String getRoom_id() {
        return this.room_id;
    }

    public void setRoom_id(String room_id) {
        this.room_id = room_id;
    }

    public String getBooking_status() {
        return this.Booking_status;
    }

    public void setBooking_status(String Booking_status) {
        this.Booking_status = Booking_status;
    }

    public int getRoom_occupancy() {
        return this.room_occupancy;
    }

    public void setRoom_occupancy(int room_occupancy) {
        this.room_occupancy = room_occupancy;
    }

    public int getRoom_description() {
        return this.room_description;
    }

    public void setRoom_description(int room_description) {
        this.room_description = room_description;
    }
}
