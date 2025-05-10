# Studentska Evidencija — Full Stack Aplikacija

Ova aplikacija omogućava evidenciju studenata, predmeta i ocena. Projekat koristi React za frontend i Spring Boot za backend, sa MySQL bazom podataka.

## Struktura projekta

student-subject-management/
├── studentska-evidencija-frontend # React aplikacija
├── studentska-evidencija-backend # Spring Boot backend
├── run-fullstack.bat # Batch fajl za paralelno pokretanje


## Pokretanje aplikacije lokalno

### Opcija 1: Pokretanje preko `.bat` fajla (Windows)

Otvorite `run-fullstack.bat` iz root direktorijuma (`student-subject-management/`).  
Batch fajl će automatski pokrenuti backend i frontend u dva odvojena terminal prozora.

- Backend će biti dostupan na: [http://localhost:8080](http://localhost:8080)  
- Frontend će biti dostupan na: [http://localhost:3000](http://localhost:3000)

### Opcija 2: Ručno pokretanje

#### Backend (Spring Boot)

```bash
cd studentska-evidencija-backend
./mvnw spring-boot:run

Zahteva instaliranu Javu (verzija 17+) i Maven (lokalno ili preko wrapper-a).
Frontend (React)

cd studentska-evidencija-frontend
npm install
npm start

Zahteva Node.js (verzija 18+) i npm.
Deploy priprema
Build frontend:

cd studentska-evidencija-frontend
npm run build

Kopiranje u backend:

Kopirati sadržaj build/ foldera u:

studentska-evidencija-backend/src/main/resources/static/

Build backend:

cd studentska-evidencija-backend
./mvnw clean install

Pokretanje .jar fajla:

java -jar target/evidencija-0.0.1-SNAPSHOT.jar

Tehnologije

    React 18

    Spring Boot 3.4.5

    Java 17

    MySQL 8

    Maven

    Axios, ESLint

Autor

David Subotin
GitHub: DavidSubotinDS
