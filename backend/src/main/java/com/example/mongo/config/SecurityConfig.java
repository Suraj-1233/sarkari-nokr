package com.example.mongo.config;


import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.mongo.service.UserService;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

@Autowired
private ObjectProvider<JwtFilter> jwtFilterProvider;

    // public SecurityConfig(JwtFilter jwtFilter) {
    //     this.jwtFilter = jwtFilter;
    // }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {}) // Enable CORS support in Spring Security
        .authorizeHttpRequests(auth -> auth
        .requestMatchers("/auth/login").permitAll()
        .requestMatchers(HttpMethod.GET, "/records", "/records/**").permitAll() // Only GET calls are public
        .requestMatchers(HttpMethod.POST, "/records").authenticated() // JWT required for POST
        .requestMatchers(HttpMethod.PUT, "/records/{id}").authenticated() // JWT required for PUT
        .requestMatchers(HttpMethod.DELETE, "/records/{id}").authenticated() // JWT required for DELETE
        .anyRequest().authenticated()
        )
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtFilterProvider.getIfAvailable(), UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
}
    @Bean
    public UserDetailsService userDetailsService(UserService userService) {
        return userService; // Use the UserService which loads from database
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
    Map<String, PasswordEncoder> encoders = new HashMap<>();
    encoders.put("bcrypt", new BCryptPasswordEncoder());

    return new DelegatingPasswordEncoder("bcrypt", encoders);
}

}
