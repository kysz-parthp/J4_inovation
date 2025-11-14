# Backend Development Prompt for J4.Innovate Website

## Project Overview
Build a RESTful backend API for J4.Innovate, a software development company website. The frontend is built with Next.js 16, React 19, and TypeScript, running on `http://localhost:3000`. The backend should run on `http://localhost:8080`.

## Technology Stack (Java)

### Core Framework
- **Framework**: Spring Boot 3.x (Java 17 or higher)
- **Build Tool**: Maven or Gradle (Maven recommended)
- **Database**: PostgreSQL (recommended) or MySQL
- **ORM**: Spring Data JPA with Hibernate
- **Validation**: Jakarta Bean Validation (javax.validation)
- **Email Service**: Spring Mail (JavaMailSender)
- **Authentication**: Spring Security with JWT (if admin panel needed)
- **CORS**: Spring Web CORS configuration
- **API Documentation**: SpringDoc OpenAPI (Swagger)
- **Logging**: Logback (included with Spring Boot) or SLF4J
- **Rate Limiting**: Bucket4j or Spring Cloud Gateway

### Required Dependencies (Maven)
```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- PostgreSQL Driver -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Spring Boot Starter Mail -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-mail</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Security (for admin panel) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- JWT Support -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.3</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.12.3</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.12.3</version>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Rate Limiting -->
    <dependency>
        <groupId>com.bucket4j</groupId>
        <artifactId>bucket4j-core</artifactId>
        <version>8.10.1</version>
    </dependency>
    
    <!-- SpringDoc OpenAPI (Swagger) -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.3.0</version>
    </dependency>
    
    <!-- Lombok (Optional but recommended) -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

## Required API Endpoints

### 1. Contact Form Submission
**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "string (required, min 2 chars)",
  "email": "string (required, valid email format)",
  "message": "string (required, min 10 chars)"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you soon."
}
```

**Response (Error - 400)**:
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**Response (Error - 500)**:
```json
{
  "success": false,
  "message": "Failed to send message. Please try again."
}
```

**Requirements**:
- Validate all fields (name, email format, message length)
- Store submission in database
- Send email notification to admin/company email
- Optional: Send auto-reply confirmation email to user
- Rate limiting: Max 3 submissions per IP per hour (prevent spam)

---

### 2. Get Services (Optional - for dynamic content)
**Endpoint**: `GET /api/services`

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Web Development",
      "description": "Modern, responsive, and scalable websites built with cutting-edge technologies.",
      "icon": "Code",
      "color": "from-blue-500 to-cyan-500",
      "order": 1
    }
    // ... more services
  ]
}
```

---

### 3. Get Portfolio Projects (Optional - for dynamic content)
**Endpoint**: `GET /api/portfolio`

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Smart AI Bot",
      "category": "AI/ML",
      "description": "Intelligent chatbot solution with natural language processing capabilities.",
      "imageUrl": "/portfolio1.jpg",
      "gradient": "from-blue-500 to-cyan-500",
      "liveUrl": "https://example.com",
      "githubUrl": "https://github.com/example",
      "order": 1
    }
    // ... more projects
  ]
}
```

---

### 4. Get Testimonials (Optional - for dynamic content)
**Endpoint**: `GET /api/testimonials`

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sarah Johnson",
      "role": "CEO, TechStart Inc.",
      "content": "J4.Innovate transformed our business...",
      "rating": 5,
      "avatar": "SJ",
      "order": 1
    }
    // ... more testimonials
  ]
}
```

---

### 5. Get Statistics (Optional - for dynamic content)
**Endpoint**: `GET /api/statistics`

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "number": "500+",
      "label": "Projects Completed",
      "icon": "Code2",
      "color": "from-blue-500 to-cyan-500",
      "order": 1
    }
    // ... more stats
  ]
}
```

---

### 6. Get FAQ (Optional - for dynamic content)
**Endpoint**: `GET /api/faq`

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "What services does J4.Innovate offer?",
      "answer": "We offer comprehensive software development services...",
      "order": 1
    }
    // ... more FAQs
  ]
}
```

---

## Database Schema

### Contact Submissions Table
```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'new', -- 'new', 'read', 'replied', 'archived'
  admin_notes TEXT
);

CREATE INDEX idx_contact_email ON contact_submissions(email);
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_status ON contact_submissions(status);
```

### Services Table (Optional)
```sql
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Portfolio Table (Optional)
```sql
CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  gradient VARCHAR(100),
  live_url VARCHAR(500),
  github_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Testimonials Table (Optional)
```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar VARCHAR(10),
  company_logo_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Statistics Table (Optional)
```sql
CREATE TABLE statistics (
  id SERIAL PRIMARY KEY,
  number VARCHAR(50) NOT NULL,
  label VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### FAQ Table (Optional)
```sql
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Security Requirements

1. **Input Validation**: Validate and sanitize all user inputs
2. **SQL Injection Prevention**: Use parameterized queries/ORM
3. **Rate Limiting**: 
   - Contact form: 3 requests per IP per hour
   - Other endpoints: 100 requests per IP per 15 minutes
4. **CORS Configuration**: Allow only `http://localhost:3000` in development
5. **Error Handling**: Don't expose sensitive error details to frontend
6. **Email Validation**: Use proper email regex validation
7. **XSS Prevention**: Sanitize all text inputs before storing

---

## Email Configuration

### Environment Variables Needed:
```
SMTP_HOST=smtp.gmail.com (or your email provider)
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@j4innovate.com
FROM_EMAIL=noreply@j4innovate.com
```

### Email Templates:

**Admin Notification Email** (when contact form is submitted):
- Subject: "New Contact Form Submission from J4.Innovate Website"
- Include: Name, Email, Message, Timestamp, IP Address

**Auto-Reply Email** (to user):
- Subject: "Thank you for contacting J4.Innovate"
- Body: Professional thank you message with company contact info

---

## Admin Panel Features (Optional but Recommended)

If implementing an admin panel, add these endpoints:

1. **Admin Authentication**
   - `POST /api/admin/login` - Admin login
   - `POST /api/admin/logout` - Admin logout
   - `GET /api/admin/me` - Get current admin user

2. **Contact Management**
   - `GET /api/admin/contacts` - List all contact submissions (with pagination)
   - `GET /api/admin/contacts/:id` - Get single contact submission
   - `PUT /api/admin/contacts/:id` - Update contact status/notes
   - `DELETE /api/admin/contacts/:id` - Delete contact submission

3. **Content Management** (if using dynamic content)
   - CRUD operations for Services, Portfolio, Testimonials, Statistics, FAQ

---

## Implementation Checklist

### Phase 1: Core Functionality (Required)
- [ ] Set up project structure
- [ ] Configure database connection
- [ ] Create contact_submissions table
- [ ] Implement POST /api/contact endpoint
- [ ] Add input validation
- [ ] Configure email service
- [ ] Add rate limiting
- [ ] Set up CORS
- [ ] Add error handling middleware
- [ ] Test contact form submission

### Phase 2: Content Management (Optional)
- [ ] Create database tables for Services, Portfolio, Testimonials, Statistics, FAQ
- [ ] Implement GET endpoints for each content type
- [ ] Seed database with initial data
- [ ] Add pagination if needed

### Phase 3: Admin Panel (Optional)
- [ ] Implement admin authentication
- [ ] Create admin endpoints for contact management
- [ ] Add JWT token authentication
- [ ] Implement content management endpoints

### Phase 4: Production Readiness
- [ ] Configure logging (Logback/SLF4J)
- [ ] Set up environment variable management (Spring profiles)
- [ ] Add database migrations (Flyway or Liquibase)
- [ ] Write API documentation (SpringDoc OpenAPI/Swagger)
- [ ] Add unit tests (JUnit 5, Mockito)
- [ ] Add integration tests (Spring Boot Test, TestContainers)
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure production profiles
- [ ] Add health check endpoint (`/actuator/health`)

---

## API Response Standards

### Success Response Format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response Format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

---

## Testing Requirements

### Test Cases for Contact Form:
1. Valid submission should return success
2. Missing required fields should return 400
3. Invalid email format should return 400
4. Message too short should return 400
5. Rate limiting should work (3 requests/hour)
6. Email should be sent to admin
7. Submission should be stored in database

---

## Deployment Considerations

1. **Environment Variables**: Use Spring profiles (`application-dev.yml`, `application-prod.yml`)
2. **Database**: Use HikariCP connection pooling (included with Spring Boot)
3. **Logging**: Implement structured logging with Logback
4. **Monitoring**: Enable Spring Boot Actuator for health checks (`/actuator/health`)
5. **Backup**: Regular database backups
6. **SSL**: Use HTTPS in production
7. **JAR Build**: Build executable JAR with `mvn clean package`
8. **Docker**: Consider Docker containerization for deployment

---

## Additional Notes

- The frontend expects the backend to run on `http://localhost:8080`
- All API responses should include CORS headers
- Consider adding request logging for debugging
- Implement proper error logging for production debugging
- Add API versioning if planning to expand: `/api/v1/contact`

---

## Java Project Structure

### Recommended Package Structure:
```
src/main/java/com/j4innovate/
├── J4InnovateApplication.java          # Main Spring Boot application
├── config/
│   ├── CorsConfig.java                 # CORS configuration
│   ├── SecurityConfig.java             # Spring Security config (if needed)
│   ├── RateLimitConfig.java            # Rate limiting configuration
│   └── MailConfig.java                 # Email configuration
├── controller/
│   ├── ContactController.java          # Contact form endpoints
│   ├── ServiceController.java           # Services endpoints (optional)
│   ├── PortfolioController.java         # Portfolio endpoints (optional)
│   ├── TestimonialController.java       # Testimonials endpoints (optional)
│   ├── StatisticsController.java        # Statistics endpoints (optional)
│   ├── FaqController.java              # FAQ endpoints (optional)
│   └── AdminController.java             # Admin endpoints (optional)
├── service/
│   ├── ContactService.java              # Contact business logic
│   ├── EmailService.java                # Email sending logic
│   └── RateLimitService.java            # Rate limiting logic
├── repository/
│   ├── ContactSubmissionRepository.java # JPA repository for contacts
│   ├── ServiceRepository.java           # JPA repository for services
│   ├── PortfolioRepository.java         # JPA repository for portfolio
│   ├── TestimonialRepository.java       # JPA repository for testimonials
│   ├── StatisticsRepository.java        # JPA repository for statistics
│   └── FaqRepository.java               # JPA repository for FAQs
├── model/
│   ├── entity/
│   │   ├── ContactSubmission.java       # Contact entity
│   │   ├── Service.java                 # Service entity
│   │   ├── Portfolio.java               # Portfolio entity
│   │   ├── Testimonial.java             # Testimonial entity
│   │   ├── Statistics.java              # Statistics entity
│   │   └── Faq.java                     # FAQ entity
│   ├── dto/
│   │   ├── ContactRequest.java          # Contact request DTO
│   │   ├── ContactResponse.java         # Contact response DTO
│   │   └── ApiResponse.java             # Generic API response wrapper
│   └── enums/
│       └── ContactStatus.java           # Contact status enum
├── exception/
│   ├── GlobalExceptionHandler.java      # Global exception handler
│   ├── ValidationException.java         # Custom validation exception
│   └── RateLimitException.java          # Rate limit exception
└── util/
    ├── EmailTemplateUtil.java           # Email template utilities
    └── ValidationUtil.java              # Custom validation utilities
```

### Application Properties (application.yml or application.properties)

**application.yml** (Recommended):
```yaml
server:
  port: 8080

spring:
  application:
    name: j4-innovate-backend
  
  datasource:
    url: jdbc:postgresql://localhost:5432/j4innovate
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:postgres}
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
  
  mail:
    host: ${SMTP_HOST:smtp.gmail.com}
    port: ${SMTP_PORT:587}
    username: ${SMTP_USER:your-email@gmail.com}
    password: ${SMTP_PASS:your-app-password}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
          connectiontimeout: 5000
          timeout: 5000
          writetimeout: 5000

# Application specific properties
app:
  admin:
    email: ${ADMIN_EMAIL:admin@j4innovate.com}
  from:
    email: ${FROM_EMAIL:noreply@j4innovate.com}
  rate-limit:
    contact:
      requests: 3
      window: 3600  # seconds (1 hour)
    general:
      requests: 100
      window: 900   # seconds (15 minutes)

# CORS configuration
cors:
  allowed-origins: http://localhost:3000
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: "*"
  allow-credentials: true

# Logging
logging:
  level:
    com.j4innovate: DEBUG
    org.springframework.web: INFO
    org.hibernate: INFO
```

**application.properties** (Alternative):
```properties
server.port=8080
spring.application.name=j4-innovate-backend

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/j4innovate
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Email
spring.mail.host=${SMTP_HOST:smtp.gmail.com}
spring.mail.port=${SMTP_PORT:587}
spring.mail.username=${SMTP_USER:your-email@gmail.com}
spring.mail.password=${SMTP_PASS:your-app-password}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Application
app.admin.email=${ADMIN_EMAIL:admin@j4innovate.com}
app.from.email=${FROM_EMAIL:noreply@j4innovate.com}
app.rate-limit.contact.requests=3
app.rate-limit.contact.window=3600
```

## Quick Start Commands

### Create Spring Boot Project:
```bash
# Using Spring Initializr (https://start.spring.io/)
# Or use Spring Boot CLI:
spring init --dependencies=web,data-jpa,postgresql,mail,validation,security \
  --build=maven --java-version=17 \
  --group-id=com.j4innovate --artifact-id=j4-innovate-backend \
  --name=j4-innovate-backend
```

### Build and Run:
```bash
# Using Maven
mvn clean install
mvn spring-boot:run

# Or using Gradle
./gradlew build
./gradlew bootRun
```

### Run with Maven Wrapper:
```bash
./mvnw spring-boot:run
```

## Java Code Examples

### Example: ContactRequest DTO
```java
package com.j4innovate.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 255, message = "Name must be between 2 and 255 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;
    
    @NotBlank(message = "Message is required")
    @Size(min = 10, message = "Message must be at least 10 characters")
    private String message;
}
```

### Example: ContactController
```java
package com.j4innovate.controller;

import com.j4innovate.model.dto.ApiResponse;
import com.j4innovate.model.dto.ContactRequest;
import com.j4innovate.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {
    
    private final ContactService contactService;
    
    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> submitContact(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest httpRequest) {
        
        contactService.processContactSubmission(request, httpRequest);
        
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Thank you for your message! We'll get back to you soon.")
            .build();
        
        return ResponseEntity.ok(response);
    }
}
```

### Example: ApiResponse DTO
```java
package com.j4innovate.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private Object errors;
}
```

### Example: ContactSubmission Entity
```java
package com.j4innovate.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "contact_submissions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(nullable = false, length = 255)
    private String email;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;
    
    @Column(name = "ip_address", length = 45)
    private String ipAddress;
    
    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ContactStatus status = ContactStatus.NEW;
    
    @Column(name = "admin_notes", columnDefinition = "TEXT")
    private String adminNotes;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
```

### Example: ContactSubmissionRepository
```java
package com.j4innovate.repository;

import com.j4innovate.model.entity.ContactSubmission;
import com.j4innovate.model.enums.ContactStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface ContactSubmissionRepository extends JpaRepository<ContactSubmission, Long> {
    Page<ContactSubmission> findByStatus(ContactStatus status, Pageable pageable);
    Page<ContactSubmission> findByEmail(String email, Pageable pageable);
    long countByEmailAndCreatedAtAfter(String email, LocalDateTime after);
    Optional<ContactSubmission> findById(Long id);
}
```

### Example: CORS Configuration
```java
package com.j4innovate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("*"));
        
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
```

### Example: Global Exception Handler
```java
package com.j4innovate.exception;

import com.j4innovate.model.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        ApiResponse response = ApiResponse.builder()
            .success(false)
            .message("Validation failed")
            .errors(errors)
            .build();
        
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(RateLimitException.class)
    public ResponseEntity<ApiResponse> handleRateLimitException(RateLimitException ex) {
        ApiResponse response = ApiResponse.builder()
            .success(false)
            .message(ex.getMessage())
            .build();
        
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGenericException(Exception ex) {
        ApiResponse response = ApiResponse.builder()
            .success(false)
            .message("An error occurred. Please try again later.")
            .build();
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
```

### Example: pom.xml (Maven)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.j4innovate</groupId>
    <artifactId>j4-innovate-backend</artifactId>
    <version>1.0.0</version>
    <name>J4 Innovate Backend</name>
    <description>Backend API for J4.Innovate website</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Add dependencies from the Required Dependencies section above -->
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

---

## Spring Boot Actuator (Health Checks & Monitoring)

Add Spring Boot Actuator dependency for health checks and monitoring:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Configure in `application.yml`:
```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info
  endpoint:
    health:
      show-details: when-authorized
```

Access health endpoint: `GET http://localhost:8080/actuator/health`

## Java Version Requirements

- **Minimum Java Version**: Java 17 (LTS)
- **Recommended**: Java 21 (LTS) or Java 17
- Spring Boot 3.x requires Java 17 or higher

## IDE Setup Recommendations

- **IntelliJ IDEA**: Recommended IDE for Spring Boot development
- **Eclipse**: Spring Tools Suite (STS) or Eclipse with Spring Tools
- **VS Code**: Java Extension Pack + Spring Boot Extension Pack

## Testing with JUnit 5

```java
@SpringBootTest
@AutoConfigureMockMvc
class ContactControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void testContactSubmission() throws Exception {
        ContactRequest request = ContactRequest.builder()
            .name("John Doe")
            .email("john@example.com")
            .message("This is a test message")
            .build();
        
        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

## Support & Questions

If you need clarification on any requirement, please refer to:
- Frontend Contact component: `src/components/Contact.tsx`
- Frontend expects: `POST http://localhost:8080/api/contact`
- Response format must match frontend expectations exactly
- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Data JPA Documentation: https://spring.io/projects/spring-data-jpa

