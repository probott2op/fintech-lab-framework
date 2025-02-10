package com.roll31.lab3.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.roll31.lab3.entity.CUST_NAME;

public interface CustomerNameRepository extends JpaRepository<CUST_NAME, Long>{
    
}
