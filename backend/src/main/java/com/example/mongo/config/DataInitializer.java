package com.example.mongo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.example.mongo.model.User;
import com.example.mongo.repository.UserRepository;

/**
 * Data Initializer - Creates default admin user if it doesn't exist
 * Set INIT_ADMIN_USERNAME and INIT_ADMIN_PASSWORD environment variables
 * to create the initial admin user on first startup
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.init.admin.username:admin}")
    private String defaultAdminUsername;

    @Value("${app.init.admin.password:}")
    private String defaultAdminPassword;

    @Value("${app.init.admin.enabled:false}")
    private boolean initAdminEnabled;

    @Override
    public void run(String... args) throws Exception {
        if (initAdminEnabled && !defaultAdminPassword.isEmpty()) {
            if (!userRepository.existsByUsername(defaultAdminUsername)) {
                User adminUser = new User();
                adminUser.setUsername(defaultAdminUsername);
                adminUser.setPassword(passwordEncoder.encode(defaultAdminPassword));
                adminUser.setRole("ADMIN");
                adminUser.setEnabled(true);
                
                userRepository.save(adminUser);
                System.out.println("✅ Default admin user created: " + defaultAdminUsername);
            } else {
                System.out.println("ℹ️  Admin user already exists: " + defaultAdminUsername);
            }
        }
    }
}

