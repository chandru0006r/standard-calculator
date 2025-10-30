Trust-Ed-Chain Backend

How to run (Dev)
- Prereqs: Java 17+, Maven
- Run: mvn spring-boot:run
- H2 console: http://localhost:8080/h2-console (JDBC URL jdbc:h2:mem:trustedb)

Structure
- src/main/java/com/trustedchain/app/
  - config/           Spring Security & app config
  - controller/       REST controllers
  - dto/              Request/response DTOs
  - entity/           JPA entities
  - mapper/           DTO mappers
  - repository/       Spring Data repositories
  - service/          Business logic and initial seed

DB
- Default: in-memory H2 with JPA auto DDL update
- To use Postgres, set spring.datasource.url/username/password and driver on application.yml or env

CORS & Auth
- CORS enabled (allow localhost:5173)
- Security currently permits all endpoints for dev; replace mock token with JWT if needed

Seed Data
- Creates sample mentors, students, loans, communities, and posts aligning with the frontend mocks

APIs
- Mirrors those documented in the frontend README.md under "Trust-Ed-Chain Backend API"
