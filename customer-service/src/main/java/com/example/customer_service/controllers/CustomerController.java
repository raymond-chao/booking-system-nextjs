package com.example.customer_service.controllers;

import com.example.customer_service.model.Customer;
import com.example.customer_service.model.CreateCustomerRequest;
import com.example.customer_service.repository.CustomerRepository;
import com.example.customer_service.security.JwtService;
import com.example.customer_service.service.CustomerService;
import io.jsonwebtoken.Jwts;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
record LoginResponse(Customer customer, String token) {}
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final CustomerRepository customerRepository;
    private final JwtService  jwtService;

    public CustomerController(CustomerService customerService, CustomerRepository customerRepository, JwtService jwtService) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
        this.jwtService = jwtService;
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Customer> getCustomerByEmail(@PathVariable String email) {
        Customer customer = customerService.getCustomerByEmail(email);
        return ResponseEntity.ok(customer);
    }



//    @PostMapping
//    public Customer createCustomer(@Valid @RequestBody CreateCustomerRequest request) {
//        return customerService.createCustomer(request);
//    }

    @PostMapping
    public ResponseEntity<?> createCustomer(
            @Valid @RequestBody CreateCustomerRequest request) {
        try {

            Customer customer = customerService.createCustomer(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(customer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }


    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id,
                                   @RequestBody Customer updatedCustomer) {

        return customerService.updateCustomer(id, updatedCustomer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {

        customerService.deleteCustomer(id);

        return ResponseEntity.noContent().build();
    }
    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        try {
            Customer customer = customerService.login(email, password);
            String token = jwtService.generateToken(email);
            return ResponseEntity.ok(new LoginResponse(customer, token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).build();
        }

    }
}
