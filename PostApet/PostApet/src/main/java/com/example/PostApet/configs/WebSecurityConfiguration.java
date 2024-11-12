package com.example.PostApet.configs;




import com.example.PostApet.Enum.UserRole;
import com.example.PostApet.Service.jwt.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity


public class WebSecurityConfiguration {

    public WebSecurityConfiguration(UserService userService) {
        this.userService = userService;
    }
    private final UserService userService;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/api/v1/auth/**").permitAll() // Allow access to authentication endpoints
                        .requestMatchers("/api/v1/admin/**").hasAuthority(UserRole.ADMIN.name()) // Only Admin can access admin endpoints
                        .requestMatchers("/api/v1/doctors/**").hasAuthority(UserRole.ADMIN.name()) // Only Admin can access doctor-related endpoints
                        .requestMatchers("/api/v1/employees/**").hasAuthority(UserRole.ADMIN.name()) // Only Admin can access employee-related endpoints
                        .requestMatchers("/api/v1/pets/**").hasAnyAuthority(UserRole.ADMIN.name(), UserRole.USER.name()) // Both Admin and User can access pets
                        .anyRequest().authenticated() // All other requests need authentication
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session (JWT)
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add the JWT filter before username-password filter

        return http.build();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService.userDetailsService());
        authProvider.setPasswordEncoder(new BCryptPasswordEncoder());
        return authProvider;
    }
}
