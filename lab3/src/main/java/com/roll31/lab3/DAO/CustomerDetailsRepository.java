package com.roll31.lab3.DAO;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roll31.lab3.entity.CUST_DETAILS;

public interface CustomerDetailsRepository extends JpaRepository<CUST_DETAILS, Long> {
    @Query("SELECT MAX(id) FROM CUST_DETAILS where id like :type%")
    public String findMaxCustId(@Param("type") String type);

    @Query("SELECT c from CUST_DETAILS c where c.id = :cust_id and c.crud_value <> 'D' and c.acpt_ts = (select max(d.acpt_ts) from CUST_DETAILS d where d.id = c.id)")
    public CUST_DETAILS findCustomerRecord(@Param("cust_id") String cust_id);

    @Query("SELECT c FROM CUST_DETAILS c WHERE c.id LIKE :search OR c.fullName LIKE :search OR c.mobile LIKE :search OR c.email LIKE :search" +
            " AND c.acpt_ts = (SELECT max(d.acpt_ts) FROM CUST_DETAILS d WHERE d.id = c.id)" +
            "AND c.crud_value <> 'D'")
    public List<CUST_DETAILS> searchCustomers(@Param("search") String search);

    @Query("SELECT c FROM CUST_DETAILS c WHERE c.email LIKE :search and c.id NOT LIKE :id")
    public List<CUST_DETAILS> searchCustomerByEmail(@Param("search") String search, @Param("id") String id);

    @Query("SELECT c FROM CUST_DETAILS c WHERE c.mobile LIKE :search and c.id NOT LIKE :id")
    public List<CUST_DETAILS> searchCustomerByMobile(@Param("search") String search, @Param("id") String id);

//    @Query("SELECT c FROM CUST_DETAILS c GROUP BY c.id HAVING c.acpt_ts = (SELECT max(d.acpt_ts) FROM CUST_DETAILS d WHERE d.id = c.id) AND c.crud_value <> 'D'")
        @Query("SELECT c FROM CUST_DETAILS c " +
        "WHERE c.acpt_ts = (SELECT max(d.acpt_ts) FROM CUST_DETAILS d WHERE d.id = c.id) " +
        "AND c.crud_value <> 'D'")
        public List<CUST_DETAILS> findActiveCustomers();
}
