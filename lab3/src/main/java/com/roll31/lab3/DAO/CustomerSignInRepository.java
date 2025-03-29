package com.roll31.lab3.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roll31.lab3.entity.CUST_SIGNIN;

public interface CustomerSignInRepository extends JpaRepository<CUST_SIGNIN, Long>{

    @Query("SELECT c FROM CUST_SIGNIN c where c.userName like :user_name and c.crud_value <> 'D' and c.id = (select max(c1.id) from CUST_SIGNIN c1 where c1.userName like :user_name)")
    CUST_SIGNIN findByUserName(@Param("user_name") String user_name);
}
