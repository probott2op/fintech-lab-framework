package com.roll31.lab3.controller;

import com.roll31.lab3.DTO.*;
import com.roll31.lab3.entity.CUST_ADDRESS;
import com.roll31.lab3.entity.CUST_CL;
import com.roll31.lab3.entity.CUST_DETAILS;
import com.roll31.lab3.entity.CUST_ID;
import com.roll31.lab3.entity.CUST_POI;
import com.roll31.lab3.entity.CUST_SIGNIN;
import com.roll31.lab3.entity.FIN_INSTITUTIONS;
import com.roll31.lab3.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1")
public class UserController {
   /*  @Autowired
    private UserService userService; */
    @Autowired
    private CustomerService customerService;

    /* @GetMapping("/getUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PostMapping("/addUser")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    } */

    // Login page sends this request and gets a JWT token in response
    @PostMapping("/users/login")
    public String login(@RequestBody UserPassDTO userPass)
    {
        String cust_SIGNIN_token = customerService.verifyUser(userPass);
        return cust_SIGNIN_token;
    }
    // Login page sends this request and gets a JWT token in response
    @PostMapping("/admin/login")
    public String adminLogin(@RequestBody UserPassDTO adminUserPass)
    {
        String cust_SIGNIN_token = customerService.verifyAdmin(adminUserPass);
        return cust_SIGNIN_token;
    }

    @PostMapping("/admin/register")
    public ResponseEntity<Object> createAdmin(@RequestBody registrationDTO regDTO)
    {
        CUST_DETAILS custDetails = customerService.addDetails(regDTO, true);
        String generatedId = custDetails.getId();

        CUST_SIGNIN cust_SIGNIN = customerService.addSignIn(generatedId, regDTO, true);
        String userName = cust_SIGNIN.getUserName();
        return new ResponseEntity<>(userName, null, HttpStatus.CREATED);
    }

    // Sign up page sends this request
    @PostMapping("/register")
    public ResponseEntity<Object> createCustomer(@RequestBody registrationDTO regDTO)
    {
       CUST_DETAILS cust_DETAILS = customerService.addDetails(regDTO, false);
       String generatedId = cust_DETAILS.getId();

       CUST_SIGNIN cust_SIGNIN = customerService.addSignIn(generatedId, regDTO, false);
       String userName = cust_SIGNIN.getUserName();
       return new ResponseEntity<>(userName, null, HttpStatus.CREATED);
    }
    // update customer details
    @PutMapping("/admin/updateDetails/{id}")
    public CUST_DETAILS updateCustomer(@PathVariable("id") String id, @RequestBody CustomerDetailsDTO customerDetailsDTO)
    {
        CUST_DETAILS cust_DETAILS = customerService.updateCustomerDetails(id, customerDetailsDTO);
        return cust_DETAILS;
    }


    @PostMapping("/admin/addClassification")
    public CUST_CL createClassification(@RequestBody TypeValue nameTypeValue)
    {
        CUST_CL cust_cl = customerService.addClassification(nameTypeValue);
        return cust_cl;
    }

    @PostMapping("/admin/addFinancialInstitution")
    public FIN_INSTITUTIONS createFin_INSTITUTIONS(@RequestBody TypeValue institutionTypeValue)
    {
        FIN_INSTITUTIONS fin_INSTITUTIONS = customerService.addFinInstitution(institutionTypeValue);
        return fin_INSTITUTIONS;
    }

    @PostMapping("/admin/addPOI/{id}")
    public CUST_POI createCust_POI(@PathVariable("id") String id, @RequestBody CustomerPoiDTO customerPoiDTO)
    {
        CUST_POI cust_POI = customerService.addCust_POI(id, customerPoiDTO);
        return cust_POI;
    }

    @PostMapping("/admin/addIdentification/{id}")
    public CUST_ID createCust_Id(@PathVariable("id") String id, @RequestBody TypeValue IdTypeValue)
    {
        CUST_ID cust_ID = customerService.addCust_ID(id, IdTypeValue);
        return cust_ID;
    }

    @PostMapping("/admin/addAddress/{id}")
    public CUST_ADDRESS createCust_ADDRESS(@PathVariable("id") String id, @RequestBody TypeValue addressTypeValue)
    {
        CUST_ADDRESS cust_ADDRESS = customerService.addCustomerAddress(id, addressTypeValue);
        return cust_ADDRESS;
    }

    @PutMapping("/admin/updateAddress/{id}")
    public CUST_ADDRESS updateCust_ADDRESS(@PathVariable("id") String id, @RequestBody TypeValue addressTypeValue)
    {
        CUST_ADDRESS cust_ADDRESS = customerService.updateCustomerAddress(id, addressTypeValue);
        return cust_ADDRESS;
    }

    @GetMapping("/users/dashboard")
    public DashBoardDTO getUserDashboard()
    {
        DashBoardDTO dashBoardDTO = customerService.getDashBoardDetails();
        return dashBoardDTO;
        
    }

    @GetMapping("/admin/dashboard")
    public DashBoardDTO getAdminDashboard()
    {
        DashBoardDTO dashBoardDTO = customerService.getDashBoardDetails();
        return dashBoardDTO;
    }
    @GetMapping("/admin/allUsers")
    public Page<AdminDashboardDTO> getAllCustomers(Pageable pageable)
    {
        return customerService.getAllCustomers(pageable);
    }

    @GetMapping("/admin/search")
    public Page<AdminDashboardDTO> searchCustomers(@RequestParam String search, Pageable pageable)
    {
        return customerService.searchCustomers(search, pageable);
    }

    @GetMapping("/admin/getCustomer/{id}")
    public CUST_DETAILS getCustomer(@PathVariable("id") String id)
    {
        CUST_DETAILS cust_DETAILS = customerService.getCustomerDetails(id);
        return cust_DETAILS;
    }

    @DeleteMapping("/admin/deleteCustomer/{id}")
    public ResponseEntity<Object> deleteCustomer(@PathVariable("id") String id)
    {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>("User Deleted Successfully",HttpStatus.OK);
    }
}