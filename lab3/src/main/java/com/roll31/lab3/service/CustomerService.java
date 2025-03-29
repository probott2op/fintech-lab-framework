package com.roll31.lab3.service;


import com.roll31.lab3.DTO.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.roll31.lab3.entity.CUST_ADDRESS;
import com.roll31.lab3.entity.CUST_CL;
import com.roll31.lab3.entity.CUST_DETAILS;
import com.roll31.lab3.entity.CUST_ID;
import com.roll31.lab3.entity.CUST_POI;
import com.roll31.lab3.entity.CUST_SIGNIN;
import com.roll31.lab3.entity.FIN_INSTITUTIONS;

public interface CustomerService {
    CUST_DETAILS addDetails(CustomerDetailsDTO customerDetailsDTO, Boolean Admin);
    CUST_CL addClassification(TypeValue nameTypeValue);
    CUST_POI addCust_POI(String id, CustomerPoiDTO customerPoiDTO);
    CUST_ID addCust_ID(String id, TypeValue IdTypeValue);
    CUST_ADDRESS addCustomerAddress(String id, TypeValue AddressTypeValue);
    CUST_SIGNIN addSignIn(String generatedId, registrationDTO regDTO, Boolean Admin);
    FIN_INSTITUTIONS addFinInstitution(TypeValue FinInstitutionTypeValue);
    CUST_DETAILS updateCustomerDetails(String id, CustomerDetailsDTO customerDetailsDTO);
    CUST_ADDRESS updateCustomerAddress(String id, TypeValue AddressTypeValue);
    String verifyUser(UserPassDTO userPass);
    String verifyAdmin(UserPassDTO userPass);
    Page<AdminDashboardDTO> getAllCustomers(Pageable pageable);
    DashBoardDTO getDashBoardDetails();
    Page<AdminDashboardDTO> searchCustomers(String search, Pageable pageable);
    CUST_DETAILS getCustomerDetails(String id);
    void deleteCustomer(String id);
}
