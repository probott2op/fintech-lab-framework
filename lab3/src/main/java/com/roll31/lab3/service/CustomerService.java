package com.roll31.lab3.service;


import com.roll31.lab3.DTO.CustomerDetailsDTO;
import com.roll31.lab3.DTO.CustomerPoiDTO;
import com.roll31.lab3.DTO.TypeValue;
import com.roll31.lab3.entity.CUST_ADDRESS;
import com.roll31.lab3.entity.CUST_CL;
import com.roll31.lab3.entity.CUST_DETAILS;
import com.roll31.lab3.entity.CUST_ID;
import com.roll31.lab3.entity.CUST_POI;
import com.roll31.lab3.entity.CUST_SIGNIN;
import com.roll31.lab3.entity.FIN_INSTITUTIONS;

public interface CustomerService {
    CUST_DETAILS addCustomerDetails(CustomerDetailsDTO customerDetailsDTO);
    CUST_CL addClassification(TypeValue nameTypeValue);
    CUST_POI addCust_POI(Long id, CustomerPoiDTO customerPoiDTO);
    CUST_ID addCust_ID(Long id, TypeValue IdTypeValue);
    CUST_ADDRESS addCustomerAddress(Long id, TypeValue AddressTypeValue);
    CUST_SIGNIN addSignIn(Long id, TypeValue userPassTypeValue);
    FIN_INSTITUTIONS addFinInstitution(TypeValue FinInstitutionTypeValue);
    CUST_DETAILS updateCustomerDetails(Long id, CustomerDetailsDTO customerDetailsDTO);
    CUST_ADDRESS updateCustomerAddress(Long id, TypeValue AddressTypeValue);
}
