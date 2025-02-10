package com.roll31.lab3.service;

import java.util.List;
import java.util.Optional;

import com.roll31.lab3.DAO.CustomerDetailsRepository;
import com.roll31.lab3.DAO.CustomerSignInRepository;
import com.roll31.lab3.DAO.UserRepository;
import com.roll31.lab3.DTO.TypeValue;
import com.roll31.lab3.entity.CUST_DETAILS;
import com.roll31.lab3.entity.CUST_SIGNIN;
import com.roll31.lab3.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerSignInRepository customerSignInRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        CUST_SIGNIN cust_SIGNIN = customerSignInRepository.findByUserName(username);
        if (cust_SIGNIN == null)
        {
            throw new UsernameNotFoundException("username not found!");
        }
        return new UserPrincipal(cust_SIGNIN);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}