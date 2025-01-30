# Spring Security JWT API 🔐

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java 17](https://img.shields.io/badge/Java-17-blue)](https://openjdk.org/projects/jdk/17/)
[![Spring Boot 3](https://img.shields.io/badge/Spring_Boot-3.2-green)](https://spring.io/projects/spring-boot)

A production-ready JWT authentication system with role-based access control, built with Spring Boot and Angular.

## Features ✨
- ✅ JWT Authentication & Authorization
- ✅ Role-Based Access Control (Admin/User)
- ✅ Secure Password Storage with BCrypt
- ✅ PostgreSQL Integration
- ✅ CORS Configuration
- ✅ Angular Frontend Demo
- ✅ API Rate Limiting
- ✅ Refresh Token Support

## Tech Stack 🛠️
**Backend**
- Java 17
- Spring Boot 3.2
- Spring Security
- JJWT 0.12.5
- PostgreSQL
- Maven

**Frontend**
- Angular 19
- RxJS 7.8
- Angular Material
- JWT Interceptors

## Installation 💻

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/spring-security-jwt.git
cd spring-security-jwt
```

### 2. Database Setup (PostgreSQL)
```sql
CREATE DATABASE security_db;
CREATE USER api_user WITH PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE security_db TO api_user;
```

### 3. Configure Application
```properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/security_db
spring.datasource.username=api_user
spring.datasource.password=your_strong_password
jwt.secret=your-512-bit-secret-key # Generate using: openssl rand -base64 512
jwt.expiration=86400000 # 24 hours
```

### 4. Run Backend
```bash
mvn spring-boot:run
```

### 5. Run Angular Frontend
```bash
cd frontend
npm install
ng serve --open
```

## API Endpoints 🌐

| Method | Endpoint            | Description                     | Auth Required |
|--------|---------------------|---------------------------------|---------------|
| POST   | `/authenticate`     | Get JWT Token                   | Public        |
| POST   | `/registerNewUser`  | Register new user               | Public         |
| GET    | `/forAdmin`         | Admin-only endpoint             | ADMIN         |
| GET    | `/forUser`          | User-specific endpoint          | USER          |

## Usage Examples 📝

### Authentication Request
```http
POST /authenticate HTTP/1.1
Content-Type: application/json

{
  "userName": "admin",
  "userPassword": "admin"
}
```

### Successful Response
```json
{
  "jwtToken": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "userName": "admin",
    "roles": ["ROLE_ADMIN"]
  }
}
```

### Secure Request
```http
GET /forAdmin HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

## Security Implementation 🔒

### JWT Flow
```mermaid
sequenceDiagram
    Client->>Server: POST /authenticate
    Server->>Client: JWT Token
    Client->>Server: Requests with JWT
    Server->>Server: Validate Token & Roles
    Server->>Client: Secure Data
```

### Role Hierarchy
```java
ADMIN > USER
```

## Frontend Integration 🖥️

**Angular Interceptor**
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('jwtToken');
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
```

**Auth Guard**
```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: UserAuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'];
    return this.authService.hasRoles(requiredRoles);
  }
}
```

## Contributing 🤝
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄
Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ by [Aashif Sajah] - [@cliff.adventurer_](https://instagram.com/cliff.adventurer_)
