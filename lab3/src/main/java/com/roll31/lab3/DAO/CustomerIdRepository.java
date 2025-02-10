package com.roll31.lab3.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.roll31.lab3.entity.CUST_ID;

public interface CustomerIdRepository extends JpaRepository<CUST_ID, Long>{
    
}
