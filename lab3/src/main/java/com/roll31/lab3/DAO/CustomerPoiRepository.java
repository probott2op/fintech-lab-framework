package com.roll31.lab3.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.roll31.lab3.entity.CUST_POI;

public interface CustomerPoiRepository extends JpaRepository<CUST_POI, Long> {
    
}
