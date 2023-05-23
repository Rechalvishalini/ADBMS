
package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Domain.Room;

@Repository
public interface RoomRepo extends JpaRepository<Room, Integer>{

    @Query(value="call View_Empty_Room", nativeQuery = true)
    List<Object[]> getEmptyRoomProc();

    @Query(value="select cus_name from room_details", nativeQuery = true)
    List<Object[]> getRoomDetails();

    @Query(value="call View_Allocated_Room", nativeQuery = true)
    List<Object[]> getAllocatedRoomView();

    @Query(value="update room set Booking_status=1, cus_id=22 where room_id=2", nativeQuery = true)
    void bookNewRoomFunc(Integer id, Integer room);


    @Query(value="select * from allRoomDetails", nativeQuery = true)
    List<Object[]> getAllRoomList();


}
