package com.raymond.bookingsystem.integration;

import com.raymond.bookingsystem.client.CustomerClient;
import com.raymond.bookingsystem.security.JwtService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.http.MediaType;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;



import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class BookingIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtService service;
    private String token;


    @MockitoBean
    private CustomerClient customerClient;

    @BeforeEach
    void setUp() {
        token = service.generateToken("hej@test.com");
    }

    @Test
    void skapaBokningGer201() throws Exception{
//        Arrange
        when(customerClient.customerExists("hej@test.com")).thenReturn(true);

//        Act and assert
        mockMvc.perform(post("/api/bookings").header("Authorization", "Bearer " + token).contentType(MediaType.APPLICATION_JSON)
                .content("{\"room\":{\"id\":1},\"checkInDate\":\"2026-12-01\",\"checkOutDate\":\"2026-12-05\",\"customerEmail\":\"hej@test.com\"}"))
                .andExpect(status().isCreated());

    }
    @Test
    void dubbelBokningGer409() throws Exception{
//        Arrange
        when(customerClient.customerExists("hej@test.com")).thenReturn(true);
        when(customerClient.customerExists("da@test.com")).thenReturn(true);

//        Act and Assert
        mockMvc.perform(post("/api/bookings").header("Authorization", "Bearer " + token).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"room\":{\"id\":1},\"checkInDate\":\"2026-12-01\",\"checkOutDate\":\"2026-12-05\",\"customerEmail\":\"hej@test.com\"}"))
                .andExpect(status().isCreated());
        mockMvc.perform(post("/api/bookings").header("Authorization", "Bearer " + token).contentType(MediaType.APPLICATION_JSON)
                .content("{\"room\":{\"id\":1},\"checkInDate\":\"2026-12-01\",\"checkOutDate\":\"2026-12-05\",\"customerEmail\":\"da@test.com\"}"))
                .andExpect(status().isConflict());



    }

    @Test
    void okandKundGer404() throws Exception{
        when(customerClient.customerExists(any())).thenReturn(false);

        mockMvc.perform(post("/api/bookings").header("Authorization", "Bearer " + token).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"room\":{\"id\":1},\"checkInDate\":\"2026-12-01\",\"checkOutDate\":\"2026-12-05\",\"customerEmail\":\"hej@test.com\"}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void BokningMedUtcheckningForeIncheckningGer400() throws Exception{
        when(customerClient.customerExists(any())).thenReturn(true);

        mockMvc.perform(post("/api/bookings")
                        .header("Authorization", "Bearer " + token).contentType(MediaType.APPLICATION_JSON)
                .content("{\"room\":{\"id\":1},\"checkInDate\":\"2026-12-05\",\"checkOutDate\":\"2026-12-04\",\"customerEmail\":\"hej@test.com\"}"))
                .andExpect(status().isBadRequest());
    }

}
