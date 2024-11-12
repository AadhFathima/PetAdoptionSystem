package com.example.PostApet.Controller.auth;
import com.example.PostApet.dto.AuthenticationRequest;
import com.example.PostApet.dto.AuthenticationResponse;
import com.example.PostApet.dto.SignupRequest;
import com.example.PostApet.dto.UserDto;
import com.example.PostApet.Model.User;
import com.example.PostApet.Repository.UserRepository;
import com.example.PostApet.Service.auth.AuthService;
import com.example.PostApet.Service.jwt.UserService;
import com.example.PostApet.util.JwtUtil;
import jakarta.persistence.EntityExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth")
//@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, UserRepository userRepository, JwtUtil jwtUtil, UserService userService) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
        try {
            UserDto createdUser = authService.createUser(signupRequest);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (EntityExistsException e) {
            return new ResponseEntity<>("User already exists with this email.", HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating user. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            // Return UNAUTHORIZED status if credentials are incorrect
            return new ResponseEntity<>("Incorrect username or password.", HttpStatus.UNAUTHORIZED);
        }

        // Load user details
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());

        // Fetch user from repository
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());

        // Check if the user exists
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }

        // Generate JWT token
        final String jwt = jwtUtil.generateToken(userDetails);

        // Prepare the response
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setJwt(jwt);
        authenticationResponse.setUserRole(optionalUser.get().getUserRole());
        authenticationResponse.setUserId(optionalUser.get().getId());

        // Return OK status with the response body
        return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
    }

}
