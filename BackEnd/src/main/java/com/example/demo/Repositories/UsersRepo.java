package com.example.demo.Repositories;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.Domain.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users,Integer>{
    @Query("select u from Users u where u.name=:name")
    List<Users> getAllU(@Param("name") String name);

    @Query(value="call Get_ALL_Users", nativeQuery = true)
    List<Object[]> getUsersWithView();
}
