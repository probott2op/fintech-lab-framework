package com.roll31.lab3.service.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.roll31.lab3.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.access.method.P;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.roll31.lab3.DAO.CustomerAddressRepository;
import com.roll31.lab3.DAO.CustomerClassificationRepository;
import com.roll31.lab3.DAO.CustomerDetailsRepository;
import com.roll31.lab3.DAO.CustomerIdRepository;
import com.roll31.lab3.DAO.CustomerNameRepository;
import com.roll31.lab3.DAO.CustomerPoiRepository;
import com.roll31.lab3.DAO.CustomerSignInRepository;
import com.roll31.lab3.DAO.FinancialInstitutionRepository;
import com.roll31.lab3.Exception.BusinessException;
import com.roll31.lab3.entity.CUST_ADDRESS;
import com.roll31.lab3.entity.CUST_CL;
import com.roll31.lab3.entity.CUST_DETAILS;
import com.roll31.lab3.entity.CUST_ID;
import com.roll31.lab3.entity.CUST_NAME;
import com.roll31.lab3.entity.CUST_POI;
import com.roll31.lab3.entity.CUST_SIGNIN;
import com.roll31.lab3.entity.FIN_INSTITUTIONS;
import com.roll31.lab3.service.CustomerService;
import com.roll31.lab3.service.Helper.CustomerServiceHelper;
import com.roll31.lab3.service.JWTService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    CustomerDetailsRepository customerDetailsRepository;
    @Autowired
    CustomerClassificationRepository customerClassificationRepository;
    @Autowired
    CustomerServiceHelper customerServiceHelper;
    @Autowired
    CustomerNameRepository customerNameRepository;
    @Autowired
    CustomerAddressRepository customerAddressRepository;
    @Autowired
    CustomerPoiRepository customerPoiRepository;
    @Autowired
    CustomerIdRepository customerIdRepository;
    @Autowired
    FinancialInstitutionRepository financialInstitutionRepository;
    @Autowired
    CustomerSignInRepository customerSignInRepository;
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JWTService jwtService;

    @Override
    public CUST_DETAILS addDetails(CustomerDetailsDTO customerDetailsDTO, Boolean Admin)
    {
        CUST_DETAILS cust_DETAILS = customerServiceHelper.generateCust_DETAILS(null, customerDetailsDTO, Admin);
        cust_DETAILS.setCrud_value('C');
        customerDetailsRepository.save(cust_DETAILS);
        addName(cust_DETAILS, customerDetailsDTO.getCustomerFullName());
        addId(cust_DETAILS);
        addAddress(cust_DETAILS, customerDetailsDTO.getCustomerFullAddress());
        return cust_DETAILS;
    }

    @Override
    public CUST_DETAILS updateCustomerDetails(String id, CustomerDetailsDTO customerDetailsDTO)
    {
        CUST_DETAILS cust_DETAILS = customerDetailsRepository.findCustomerRecord(id);
        if (cust_DETAILS == null)
        {
            throw new BusinessException("invalidCredential");
        }
        CUST_DETAILS updatedCust_DETAILS = customerServiceHelper.generateCust_DETAILS(id, customerDetailsDTO, false);
        updatedCust_DETAILS.setCrud_value('U');
        customerDetailsRepository.save(updatedCust_DETAILS);
        updateName(cust_DETAILS, customerDetailsDTO.getCustomerFullName(), updatedCust_DETAILS);
        updateId(cust_DETAILS, updatedCust_DETAILS);
        updateAddress(cust_DETAILS, customerDetailsDTO.getCustomerFullAddress(), updatedCust_DETAILS);
        return updatedCust_DETAILS;
    }

    @Override
    public CUST_CL addClassification(TypeValue nameTypeValue)
    {
        CUST_CL cust_CL = customerServiceHelper.generateCust_CL(nameTypeValue);
        customerClassificationRepository.save(cust_CL);
        return cust_CL;
    }

    @Override
    public CUST_POI addCust_POI(String id, CustomerPoiDTO customerPoiDTO)
    {
        Optional<CUST_DETAILS> cust_DETAILS =  Optional.of(customerDetailsRepository.findCustomerRecord(id));
        CUST_POI cust_POI = customerServiceHelper.generateCust_POI(cust_DETAILS, customerPoiDTO);
        cust_POI.setCrud_value('C');
        customerPoiRepository.save(cust_POI);
        return cust_POI;
    }

    @Override
    public CUST_ID addCust_ID(String id, TypeValue IdTypeValue)
    {
        Optional<CUST_DETAILS> cust_DETAILS = Optional.of(customerDetailsRepository.findCustomerRecord(id));
        CUST_ID cust_ID = customerServiceHelper.generateCust_ID(cust_DETAILS, IdTypeValue);
        cust_ID.setCrud_value('C');
        customerIdRepository.save(cust_ID);
        return cust_ID;
    }

    @Override
    public CUST_ADDRESS addCustomerAddress(String id, TypeValue AddressTypeValue)
    {
        Optional<CUST_DETAILS> cust_DETAILS = Optional.of(customerDetailsRepository.findCustomerRecord(id));
        CUST_ADDRESS cust_ADDRESS = customerServiceHelper.generateCust_ADDRESS(cust_DETAILS, AddressTypeValue);
        cust_ADDRESS.setCrud_value('C');
        customerAddressRepository.save(cust_ADDRESS);
        return cust_ADDRESS;
    }

    @Override
    public CUST_ADDRESS updateCustomerAddress(String id, TypeValue AddressTypeValue)
    {
        Optional<CUST_DETAILS> cust_DETAILS = Optional.of(customerDetailsRepository.findCustomerRecord(id));
        CUST_ADDRESS cust_ADDRESS = customerServiceHelper.generateCust_ADDRESS(cust_DETAILS, AddressTypeValue);
        cust_ADDRESS.setCrud_value('U');
        customerAddressRepository.save(cust_ADDRESS);
        // checking if the country is the same or changed
        if (!cust_DETAILS.get().getCountry().equals(customerAddressRepository.findCustomerTerritory(cust_DETAILS.get().getIdfr(), "country")))
        {
            cust_DETAILS.get().setCountry(AddressTypeValue.getValue());
        }
        return cust_ADDRESS;
    }

    @Override
    public CUST_SIGNIN addSignIn(String id, registrationDTO regDTO, Boolean Admin)
    {
        Optional<CUST_DETAILS> cust_DETAILS = Optional.of(customerDetailsRepository.findCustomerRecord(id));
        if (cust_DETAILS.isPresent())
        {
            CUST_SIGNIN cust_SIGNIN = new CUST_SIGNIN();
            cust_SIGNIN.setCust_DETAILS(cust_DETAILS.get());
            cust_SIGNIN.setLdbid(cust_DETAILS.get().getLdbid());
            final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
            cust_SIGNIN.setPassword(encoder.encode(regDTO.getPassword()));
            cust_SIGNIN.setUserName(id);
            if (Admin)
            {
                cust_SIGNIN.setRole("ADMIN");
            }
            else
            {
                cust_SIGNIN.setRole("USER");
            }
            cust_SIGNIN.setCrud_value('C');
            customerServiceHelper.setAuditLog(cust_SIGNIN);
            customerSignInRepository.save(cust_SIGNIN);
            return cust_SIGNIN;
        }
        
        else
        {
            throw new BusinessException("invalidCredential");
        }
    }

    @Override
    public FIN_INSTITUTIONS addFinInstitution(TypeValue FinInstitutionTypeValue)
    {
        FIN_INSTITUTIONS fin_INSTITUTIONS = new FIN_INSTITUTIONS();
        fin_INSTITUTIONS.setType(FinInstitutionTypeValue.getType());
        fin_INSTITUTIONS.setName(FinInstitutionTypeValue.getValue());
        fin_INSTITUTIONS.setCrud_value('C');
        customerServiceHelper.setAuditLog(fin_INSTITUTIONS);
        financialInstitutionRepository.save(fin_INSTITUTIONS);
        return fin_INSTITUTIONS;
    }

    public void updateName(CUST_DETAILS cust_DETAILS, List<TypeValue> nameParts, CUST_DETAILS updatedCust_DETAILS)
    {
        if(cust_DETAILS.getFullName().equals(updatedCust_DETAILS.getFullName()))
        {
            return;
        }
        for (TypeValue namepart: nameParts)
        {
            CUST_NAME cust_NAME = customerServiceHelper.generateCust_NAME(cust_DETAILS, namepart);
            cust_NAME.setCrud_value('U');
            customerNameRepository.save(cust_NAME);
        }
    }
    public void addName(CUST_DETAILS cust_DETAILS, List<TypeValue> nameParts)
    {
        for (TypeValue namepart: nameParts)
        {
            CUST_NAME cust_NAME = customerServiceHelper.generateCust_NAME(cust_DETAILS, namepart);
            cust_NAME.setCrud_value('C');
            customerNameRepository.save(cust_NAME);
        }
    }
    public void addId(CUST_DETAILS cust_DETAILS)
    {
        TypeValue mobileTypeValue = new TypeValue();
        mobileTypeValue.setType("mobile");
        mobileTypeValue.setValue(cust_DETAILS.getMobile());
        CUST_ID mobileId = customerServiceHelper.generateCust_ID(Optional.of(cust_DETAILS), mobileTypeValue);
        mobileId.setCrud_value('C');
        customerIdRepository.save(mobileId);

        TypeValue emaiTypeValue = new TypeValue();
        emaiTypeValue.setType("email");
        emaiTypeValue.setValue(cust_DETAILS.getEmail());
        CUST_ID emailId = customerServiceHelper.generateCust_ID(Optional.of(cust_DETAILS), emaiTypeValue);
        emailId.setCrud_value('C');
        customerIdRepository.save(emailId);
    }
    public void updateId(CUST_DETAILS cust_DETAILS, CUST_DETAILS updatedCust_DETAILS)
    {
        if (!cust_DETAILS.getMobile().equals(updatedCust_DETAILS.getMobile()))
        {
            TypeValue mobileTypeValue = new TypeValue();
            mobileTypeValue.setType("mobile");
            mobileTypeValue.setValue(updatedCust_DETAILS.getMobile());
            CUST_ID mobileId = customerServiceHelper.generateCust_ID(Optional.of(updatedCust_DETAILS), mobileTypeValue);
            mobileId.setCrud_value('U');
            customerIdRepository.save(mobileId);
        }
        else if (!cust_DETAILS.getEmail().equals(updatedCust_DETAILS.getEmail()))
        {
            TypeValue emaiTypeValue = new TypeValue();
            emaiTypeValue.setType("email");
            emaiTypeValue.setValue(updatedCust_DETAILS.getEmail());
            CUST_ID emailId = customerServiceHelper.generateCust_ID(Optional.of(updatedCust_DETAILS), emaiTypeValue);
            emailId.setCrud_value('U');
            customerIdRepository.save(emailId);
        }
    }
    public void addAddress(CUST_DETAILS cust_DETAILS, List<TypeValue> address)
    {
        for (TypeValue territory: address)
        {
            CUST_ADDRESS cust_ADDRESS = customerServiceHelper.generateCust_ADDRESS(Optional.of(cust_DETAILS), territory);
            cust_ADDRESS.setCrud_value('C');
            customerAddressRepository.save(cust_ADDRESS);
        }
    }

    public void updateAddress(CUST_DETAILS cust_DETAILS, List<TypeValue> address, CUST_DETAILS updateCust_DETAILS)
    {
        Long cstDetIdfr = cust_DETAILS.getIdfr();
        List<TypeValue> prevAddress = customerAddressRepository.findCustomerAddress(cstDetIdfr);
        for (TypeValue territory: address)
        {
            int flag = 0;
            for (TypeValue prevTerritory: prevAddress)
            {
                if (prevTerritory.equals(territory))
                {
                    flag = -1;
                    break;
                }
            }
            if (flag == 0)
            {
                CUST_ADDRESS cust_ADDRESS = customerServiceHelper.generateCust_ADDRESS(Optional.of(updateCust_DETAILS), territory);
                cust_ADDRESS.setCrud_value('U');
                customerAddressRepository.save(cust_ADDRESS);
            }
        }
    }

    @Override
    public String verifyUser(UserPassDTO userPass) {
        CUST_SIGNIN cust_SIGNIN = customerSignInRepository.findByUserName(userPass.getUserName());
        if (cust_SIGNIN == null)
        {
            throw new BusinessException("invalidCredential");
        }
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(userPass.getUserName(), userPass.getPassword()));
        if (authentication.isAuthenticated())
        {
            return jwtService.generateToken(userPass.getUserName());
        }
        throw new BusinessException("invalidCredential");
    }

    @Override
    public String verifyAdmin(UserPassDTO userPass)
    {
        CUST_SIGNIN cust_SIGNIN = customerSignInRepository.findByUserName(userPass.getUserName());
        if (cust_SIGNIN == null)
        {
            System.out.println("User doesnt exist");
            return "User doesnt exist";
        }
        if (cust_SIGNIN.getRole().equals("USER"))
        {
            System.out.println("User is not an admin");
            return "User is not an admin";
        }
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(userPass.getUserName(), userPass.getPassword()));
        if (authentication.isAuthenticated())
        {
            return jwtService.generateToken(userPass.getUserName());
        }
        System.out.println("Invalid Credentials");
        return "Invalid Credentials";
    }

    @Override
    public Page<AdminDashboardDTO> getAllCustomers(Pageable pageable)
    {
        List<CUST_DETAILS> activeCustomers = customerDetailsRepository.findActiveCustomers();
        List<AdminDashboardDTO> adminDTO = new ArrayList<>();
        for (CUST_DETAILS customer: activeCustomers)
        {
            AdminDashboardDTO adminDashboardDTO = new AdminDashboardDTO();
            adminDashboardDTO.setUserName(customer.getId());
            adminDashboardDTO.setName(customer.getFullName());
            adminDashboardDTO.setEmail(customer.getEmail());
            adminDTO.add(adminDashboardDTO);
        }


        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), adminDTO.size());

        // Create a sublist for the page
        List<AdminDashboardDTO> pageContent = adminDTO.subList(start, end);

        // Create and return the Page object with the sublist
        return new PageImpl<>(pageContent, pageable, adminDTO.size());
    }
    
    @Override
    public DashBoardDTO getDashBoardDetails()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        CUST_SIGNIN cust_SIGNIN = customerSignInRepository.findByUserName(username);
        if (cust_SIGNIN == null)
        {
            throw new BusinessException("invalidCredential");
        }
        CUST_DETAILS cust_DETAILS = cust_SIGNIN.getCust_DETAILS();

        DashBoardDTO dashBoardDTO = new DashBoardDTO();
        dashBoardDTO.setUserName(username);
        dashBoardDTO.setFullName(cust_DETAILS.getFullName());
        dashBoardDTO.setAccountType(cust_DETAILS.getType().getTypeValue());
        dashBoardDTO.setLastLogin(cust_SIGNIN.getHost_ts());
        return dashBoardDTO;
    }

    @Override
    public Page<AdminDashboardDTO> searchCustomers(String search, Pageable pageable)
    {
        search = "%" + search + "%";
        List<CUST_DETAILS> searchedCustomers = customerDetailsRepository.searchCustomers(search);
        List<AdminDashboardDTO> adminDTO = new ArrayList<>();
        for (CUST_DETAILS customer: searchedCustomers)
        {
            AdminDashboardDTO adminDashboardDTO = new AdminDashboardDTO();
            adminDashboardDTO.setUserName(customer.getId());
            adminDashboardDTO.setName(customer.getFullName());
            adminDashboardDTO.setEmail(customer.getEmail());
            adminDTO.add(adminDashboardDTO);
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), adminDTO.size());

        // Create a sublist for the page
        List<AdminDashboardDTO> pageContent = adminDTO.subList(start, end);

        return new PageImpl<>(pageContent, pageable, adminDTO.size());
    }

    @Override
    public CUST_DETAILS getCustomerDetails(String id)
    {
        return customerDetailsRepository.findCustomerRecord(id);
    }

    @Override
    public void deleteCustomer(String id)
    {
        CUST_DETAILS cust_DETAILS = customerDetailsRepository.findCustomerRecord(id);
        if (cust_DETAILS == null)
        {
            throw new BusinessException("invalidCredential");
        }
        CUST_DETAILS updatedCust_DETAILS = cust_DETAILS.clone();
        customerServiceHelper.setAuditLog(updatedCust_DETAILS);
        updatedCust_DETAILS.setCrud_value('D');
        customerDetailsRepository.save(updatedCust_DETAILS);
        deleteSignIn(id);
    }

    public void deleteSignIn(String id)
    {
        CUST_SIGNIN custSignin = customerSignInRepository.findByUserName(id);
        if (custSignin == null)
        {
            throw new BusinessException("invalidCredential");
        }
        CUST_SIGNIN updatedSignIn = custSignin.clone();
        customerServiceHelper.setAuditLog(custSignin);
        custSignin.setCrud_value('D');
        customerSignInRepository.save(custSignin);
    }
}
