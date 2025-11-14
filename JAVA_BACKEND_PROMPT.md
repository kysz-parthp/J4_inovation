# Complete Java Backend Development Prompt for J4.Innovate

## Project Overview
Build a RESTful backend API using **Java Spring Boot** for J4.Innovate, a software development company website. The frontend is built with Next.js 16, React 19, and TypeScript, running on `http://localhost:3000`. The backend must run on `http://localhost:8080`.

---

## Technology Stack

### Core Framework
- **Framework**: Spring Boot 3.2.x (Java 17 or higher required)
- **Build Tool**: Maven (recommended) or Gradle
- **Database**: PostgreSQL (recommended) or MySQL
- **ORM**: Spring Data JPA with Hibernate
- **Validation**: Jakarta Bean Validation
- **Email Service**: Spring Mail (JavaMailSender)
- **Authentication**: Spring Security with JWT (for admin panel)
- **CORS**: Spring Web CORS configuration
- **API Documentation**: SpringDoc OpenAPI (Swagger UI)
- **Logging**: Logback (included with Spring Boot)
- **Rate Limiting**: Bucket4j
- **Testing**: JUnit 5, Mockito, Spring Boot Test

### Required Maven Dependencies (pom.xml)
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
        
        <!-- Spring Boot Actuator (Health Checks) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
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
        
        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
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

## Project Structure

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
│   ├── ServiceController.java          # Services endpoints (optional)
│   ├── PortfolioController.java       # Portfolio endpoints (optional)
│   ├── TestimonialController.java     # Testimonials endpoints (optional)
│   ├── StatisticsController.java      # Statistics endpoints (optional)
│   ├── FaqController.java             # FAQ endpoints (optional)
│   └── AdminController.java           # Admin endpoints (optional)
├── service/
│   ├── ContactService.java             # Contact business logic
│   ├── EmailService.java               # Email sending logic
│   └── RateLimitService.java          # Rate limiting logic
├── repository/
│   ├── ContactSubmissionRepository.java
│   ├── ServiceRepository.java
│   ├── PortfolioRepository.java
│   ├── TestimonialRepository.java
│   ├── StatisticsRepository.java
│   └── FaqRepository.java
├── model/
│   ├── entity/
│   │   ├── ContactSubmission.java
│   │   ├── Service.java
│   │   ├── Portfolio.java
│   │   ├── Testimonial.java
│   │   ├── Statistics.java
│   │   └── Faq.java
│   ├── dto/
│   │   ├── ContactRequest.java
│   │   ├── ContactResponse.java
│   │   └── ApiResponse.java
│   └── enums/
│       └── ContactStatus.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── ValidationException.java
│   └── RateLimitException.java
└── util/
    ├── EmailTemplateUtil.java
    └── ValidationUtil.java
```

---

## Application Configuration

### application.yml (Recommended)
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
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
  
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

# Actuator (Health Checks)
management:
  endpoints:
    web:
      exposure:
        include: health,info
  endpoint:
    health:
      show-details: when-authorized

# Logging
logging:
  level:
    com.j4innovate: DEBUG
    org.springframework.web: INFO
    org.hibernate: INFO
```

---

## Required API Endpoints

### 1. Contact Form Submission (REQUIRED)
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
  "message": "Validation error message",
  "errors": {
    "email": "Invalid email format"
  }
}
```

**Response (Error - 429 - Rate Limit)**:
```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

**Requirements**:
- Validate all fields (name, email format, message length)
- Store submission in database
- Send email notification to admin/company email
- Optional: Send auto-reply confirmation email to user
- Rate limiting: Max 3 submissions per IP per hour
- Capture IP address and user agent

---

### 2. Get Services (Optional)
**Endpoint**: `GET /api/services`

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Web Development",
      "description": "Modern, responsive, and scalable websites...",
      "icon": "Code",
      "color": "from-blue-500 to-cyan-500",
      "order": 1
    }
  ]
}
```

---

### 3. Get Portfolio Projects (Optional)
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
      "description": "Intelligent chatbot solution...",
      "imageUrl": "/portfolio1.jpg",
      "gradient": "from-blue-500 to-cyan-500",
      "liveUrl": "https://example.com",
      "githubUrl": "https://github.com/example",
      "order": 1
    }
  ]
}
```

---

### 4. Get Testimonials (Optional)
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
  ]
}
```

---

### 5. Get Statistics (Optional)
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
  ]
}
```

---

### 6. Get FAQ (Optional)
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
  ]
}
```

---

### 7. Health Check
**Endpoint**: `GET /actuator/health`

**Response (200)**:
```json
{
  "status": "UP"
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
  status VARCHAR(20) DEFAULT 'new',
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

## Java Code Examples

### ContactRequest DTO
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

### ApiResponse DTO
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

### ContactSubmission Entity
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

### ContactStatus Enum
```java
package com.j4innovate.model.enums;

public enum ContactStatus {
    NEW, READ, REPLIED, ARCHIVED
}
```

### ContactSubmissionRepository
```java
package com.j4innovate.repository;

import com.j4innovate.model.entity.ContactSubmission;
import com.j4innovate.model.enums.ContactStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ContactSubmissionRepository extends JpaRepository<ContactSubmission, Long> {
    Page<ContactSubmission> findByStatus(ContactStatus status, Pageable pageable);
    Page<ContactSubmission> findByEmail(String email, Pageable pageable);
    long countByEmailAndCreatedAtAfter(String email, LocalDateTime after);
}
```

### ContactController
```java
package com.j4innovate.controller;

import com.j4innovate.model.dto.ApiResponse;
import com.j4innovate.model.dto.ContactRequest;
import com.j4innovate.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

### CORS Configuration
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

### Global Exception Handler
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

### RateLimitException
```java
package com.j4innovate.exception;

public class RateLimitException extends RuntimeException {
    public RateLimitException(String message) {
        super(message);
    }
}
```

---

## Security Requirements

1. **Input Validation**: Use Jakarta Bean Validation annotations
2. **SQL Injection Prevention**: Use JPA/Hibernate (parameterized queries)
3. **Rate Limiting**: 
   - Contact form: 3 requests per IP per hour
   - Other endpoints: 100 requests per IP per 15 minutes
4. **CORS Configuration**: Allow only `http://localhost:3000` in development
5. **Error Handling**: Don't expose sensitive error details
6. **Email Validation**: Use `@Email` annotation
7. **XSS Prevention**: Sanitize text inputs before storing

---

## Email Configuration

### Environment Variables:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
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

## Implementation Checklist

### Phase 1: Core Functionality (Required)
- [ ] Set up Spring Boot project structure
- [ ] Configure database connection (PostgreSQL)
- [ ] Create ContactSubmission entity and repository
- [ ] Implement POST /api/contact endpoint
- [ ] Add input validation (Bean Validation)
- [ ] Configure email service (Spring Mail)
- [ ] Add rate limiting (Bucket4j)
- [ ] Set up CORS configuration
- [ ] Add global exception handler
- [ ] Test contact form submission

### Phase 2: Content Management (Optional)
- [ ] Create database tables for Services, Portfolio, Testimonials, Statistics, FAQ
- [ ] Create entities and repositories
- [ ] Implement GET endpoints for each content type
- [ ] Seed database with initial data
- [ ] Add pagination if needed

### Phase 3: Admin Panel (Optional)
- [ ] Implement admin authentication (Spring Security + JWT)
- [ ] Create admin endpoints for contact management
- [ ] Add JWT token authentication
- [ ] Implement content management endpoints (CRUD)

### Phase 4: Production Readiness
- [ ] Configure logging (Logback)
- [ ] Set up Spring profiles (dev, prod)
- [ ] Add database migrations (Flyway or Liquibase)
- [ ] Write API documentation (SpringDoc OpenAPI)
- [ ] Add unit tests (JUnit 5, Mockito)
- [ ] Add integration tests (Spring Boot Test)
- [ ] Configure Spring Boot Actuator
- [ ] Set up error monitoring (Sentry, etc.)

---

## API Response Standards

### Success Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": "Error message for field"
  }
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

### Example Test (JUnit 5):
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

---

## Quick Start Commands

### Create Project:
```bash
# Using Spring Initializr: https://start.spring.io/
# Select: Web, JPA, PostgreSQL, Mail, Validation, Security, Actuator
# Or use Spring Boot CLI:
spring init --dependencies=web,data-jpa,postgresql,mail,validation,security,actuator \
  --build=maven --java-version=17 \
  --group-id=com.j4innovate --artifact-id=j4-innovate-backend
```

### Build and Run:
```bash
# Using Maven
mvn clean install
mvn spring-boot:run

# Or using Maven Wrapper
./mvnw spring-boot:run

# Build executable JAR
mvn clean package
java -jar target/j4-innovate-backend-1.0.0.jar
```

---

## Deployment Considerations

1. **Environment Variables**: Use Spring profiles (`application-dev.yml`, `application-prod.yml`)
2. **Database**: Use HikariCP connection pooling (included with Spring Boot)
3. **Logging**: Implement structured logging with Logback
4. **Monitoring**: Enable Spring Boot Actuator (`/actuator/health`)
5. **Backup**: Regular database backups
6. **SSL**: Use HTTPS in production
7. **JAR Build**: Build executable JAR with `mvn clean package`
8. **Docker**: Consider Docker containerization

---

## Java Version Requirements

- **Minimum**: Java 17 (LTS)
- **Recommended**: Java 21 (LTS) or Java 17
- Spring Boot 3.x requires Java 17 or higher

---

## IDE Setup Recommendations

- **IntelliJ IDEA**: Recommended IDE for Spring Boot
- **Eclipse**: Spring Tools Suite (STS)
- **VS Code**: Java Extension Pack + Spring Boot Extension Pack

---

## Important Notes

- Frontend expects backend on `http://localhost:8080`
- Frontend Contact component: `src/components/Contact.tsx`
- Frontend expects: `POST http://localhost:8080/api/contact`
- Response format must match frontend expectations exactly
- All API responses should include CORS headers
- Use Spring profiles for different environments

---

## Resources

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- Spring Security: https://spring.io/projects/spring-security
- SpringDoc OpenAPI: https://springdoc.org/

---

**This prompt contains all necessary information to build a complete Java Spring Boot backend for the J4.Innovate website.**

