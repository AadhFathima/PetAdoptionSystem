Overview
The Pet Adoption System allows users to browse available pets, submit adoption requests, and allows administrators to manage pet information, users,employees,doctors and adoption requests. 
It provides an easy-to-use platform for pet adoption, ensuring both users and admins have an efficient way to interact with the system.

Features
User Authentication:
Sign up and log in for both users and admins using JWT (JSON Web Token) authentication.
Secure role-based access control (RBAC) to ensure that only admins can access certain features,emloyees can view their profiles and doctors can view their appointments.

Pet Management:
Admins can add, update, and delete pet profiles,employees and doctors.
Users can view all available pets for adoption.

Adoption Requests:
Users can submit adoption requests for specific pets.
Admins can view, accept, or reject adoption requests.

Role-Based Access Control (RBAC):
Admins have full access to manage pets, users,employees,doctors and adoption requests.
Users can only browse available pets and submit adoption requests.

Tech Stack
Backend:
    Spring Boot
    Spring Security
    JWT for authentication
    MySQL (for database storage)
    JPA (Java Persistence API)

Frontend:
    React.js (for building the user interface)
    Axios (for HTTP requests)

Installation and Setup
Prerequisites
      Java 11 or higher
      Intellij IDEA
      MySQL
      Node.js (for the frontend)
      
Backend Setup
  1.Clone the repository:
      git clone https://github.com/your-repository/pet-adoption-system.git
  2.Navigate to the backend directory:
      cd pet-adoption-system/backend
  3.Install dependencies and build the application:
      mvn clean install
  4.Create a MySQL database and configure application.properties.
  5.Run the backend:
      mvn spring-boot:run

Frontend Setup
1.Navigate to the frontend directory:
    cd pet-adoption-system/frontend
2.Install dependencies:
    npm install
3.Run the frontend:  
    npm start
The frontend will be available at http://localhost:3000.

