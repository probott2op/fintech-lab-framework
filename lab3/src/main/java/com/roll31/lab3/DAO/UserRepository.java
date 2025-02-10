package com.roll31.lab3.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import com.roll31.lab3.entity.User;
public interface UserRepository extends JpaRepository<User, Long> {
}
