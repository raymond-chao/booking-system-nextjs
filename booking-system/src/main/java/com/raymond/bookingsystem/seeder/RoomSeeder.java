package com.raymond.bookingsystem.seeder;

import com.raymond.bookingsystem.model.Room;
import com.raymond.bookingsystem.model.RoomType;
import com.raymond.bookingsystem.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@Order(1)
public class RoomSeeder implements CommandLineRunner {

    private final RoomRepository roomRepository;

    public RoomSeeder(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public void run(String... args) {
        if (roomRepository.count() == 0) {
            System.out.println("Seedar");

            // Enkelrum
            roomRepository.save(new Room("101", 1, new BigDecimal("800.00"), "Mysigt enkelrum med utsikt mot gården", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.SINGLE ));
            roomRepository.save(new Room("102", 1, new BigDecimal("800.00"), "Enkelt och funktionellt rum", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.SINGLE));
            roomRepository.save(new Room("103", 1, new BigDecimal("850.00"), "Enkelrum med balkong", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.SINGLE));
            roomRepository.save(new Room("104", 1, new BigDecimal("800.00"), "Kompakt rum perfekt för en person", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.SINGLE));

            // Dubbelrum
            roomRepository.save(new Room("105", 2, new BigDecimal("1100.00"), "Rymligt dubbelrum med två separata sängar", "https://plus.unsplash.com/premium_photo-1687995673398-bf3e55667dc5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.DOUBLE));
            roomRepository.save(new Room("106", 2, new BigDecimal("1100.00"), "Dubbelrum med dubbelsäng", "https://plus.unsplash.com/premium_photo-1687995673398-bf3e55667dc5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.DOUBLE));
            roomRepository.save(new Room("107", 2, new BigDecimal("1200.00"), "Dubbelrum med balkong och havsutsikt", "https://plus.unsplash.com/premium_photo-1687995673398-bf3e55667dc5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.DOUBLE));

            // Familjerum
            roomRepository.save(new Room("108", 3, new BigDecimal("2100.00"), "Familjerum med plats för 3 personer", "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.DOUBLE));
            roomRepository.save(new Room("109", 3, new BigDecimal("2100.00"), "Stort familjerum med extra säng", "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.DOUBLE));
            roomRepository.save(new Room("110", 3, new BigDecimal("2300.00"), "Deluxe familjerum med balkong och havsutsikt", "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", RoomType.DOUBLE));

            System.out.println("10 rum har skapats!");
        } else {
            System.out.println("Rum finns redan, skippar seeding");
        }
    }
}