package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Domain.Invoice;

@Repository
public interface InvoiceRepo extends JpaRepository<Invoice, Integer> {
    
    @Query(value = "select * from PROFIT_MARGIN", nativeQuery = true)
    String getMyProMar();

}
