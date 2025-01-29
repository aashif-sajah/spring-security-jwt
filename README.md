```markdown
# Spring Security JWT Authentication API 🔐

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java](https://img.shields.io/badge/Java-17-blue)](https://openjdk.org/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green)](https://spring.io/projects/spring-boot)

A robust authentication and authorization system implementing JWT-based security with Spring Boot and Spring Security. Perfect for kickstarting secure web applications with role-based access control.

## Features ✨

- **JWT Authentication**: Secure token-based authentication flow
- **Role-Based Access Control**: Admin/User roles with granular permissions
- **User Registration**: Secure endpoint for new user registration
- **Password Encryption**: BCrypt password encoding
- **CORS Configuration**: Pre-configured for frontend integration
- **PostgreSQL Integration**: Ready for production databases
- **API Documentation**: Clear endpoint specifications
- **Error Handling**: Custom exception handling framework

## Tech Stack 🛠️

**Backend:**
- Java 17
- Spring Boot 3.2
- Spring Security
- JJWT (JSON Web Tokens)
- PostgreSQL
- Maven

**Frontend (Example):**
- Angular 19
- RxJS
- Angular Material
- JWT Interceptors

## Getting Started 🚀

### Prerequisites

- Java 17 JDK
- Maven 3.6+
- PostgreSQL 14+
- Node.js 18+ (for frontend)
- Angular CLI (for frontend)

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/spring-security-jwt.git
cd spring-security-jwt
```

2. **Database Setup**
```sql
CREATE DATABASE security_db;
CREATE USER api_user WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE security_db TO api_user;
```

3. **Backend Configuration**
```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/security_db
spring.datasource.username=api_user
spring.datasource.password=securepassword
jwt.secret=your-512-bit-secure-secret-key
jwt.expiration=86400000 # 24 hours
```

4. **Run Backend**
```bash
mvn spring-boot:run
```

5. **Frontend Setup**
```bash
cd frontend
npm install
ng serve
```

## API Endpoints 🌐

| Method | Endpoint            | Description                     | Required Role |
|--------|---------------------|---------------------------------|---------------|
| POST   | `/authenticate`     | Generate JWT token              | Public        |
| POST   | `/registerNewUser`  | Register new user               | Admin         |
| GET    | `/forAdmin`         | Admin-only resource             | ADMIN         |
| GET    | `/forUser`          | User-specific resource          | USER          |

**Sample Authentication Request:**
```http
POST /authenticate HTTP/1.1
Content-Type: application/json

{
  "userName": "admin",
  "userPassword": "admin"
}
```

**Successful Response:**
```json
{
  "jwtToken": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "userName": "admin",
    "roles": ["ADMIN"]
  }
}
```

## Security Implementation 🔒

### JWT Flow
1. Client sends credentials to `/authenticate`
2. Server validates credentials and returns JWT
3. Client stores JWT (localStorage/sessionStorage)
4. Subsequent requests include JWT in Authorization header
5. Server validates JWT and grants access based on roles

### Role Hierarchy
```java
ADMIN > USER
```

## Frontend Integration 💻

**Angular Auth Service:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(credentials: JwtRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/authenticate`, credentials);
  }

  getProtectedData(): Observable<string> {
    return this.http.get(`${this.baseUrl}/forAdmin`, { responseType: 'text' });
  }
}
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

**Coding Standards:**
- Follow Google Java Style Guide
- Write comprehensive unit tests
- Maintain API documentation
- Keep commits atomic and well-described

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Coding!** 🚀 Built with ❤️ by Aashif Sajah
```

