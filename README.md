🎓 Studentska Evidencija — Full Stack Aplikacija

Ova aplikacija omogućava evidenciju studenata, predmeta i ocena. Projekat koristi React za frontend i Spring Boot za backend, sa MySQL bazom podataka.
📁 Struktura projekta

student-subject-management/
├── studentska-evidencija-frontend    # React aplikacija
├── studentska-evidencija-backend     # Spring Boot backend
├── run-fullstack.bat                 # Batch fajl za paralelno pokretanje

🚀 Pokretanje lokalno
🔧 1. Backend (Spring Boot)

Pređi u folder studentska-evidencija-backend i pokreni komandu:

./mvnw spring-boot:run

Backend će biti dostupan na: http://localhost:8080
🌐 2. Frontend (React)

Pređi u folder studentska-evidencija-frontend i izvrši:

npm install
npm start

Frontend će biti dostupan na: http://localhost:3000
🏁 Alternativa: Pokreni sve jednim klikom (Windows)

Pokreni run-fullstack.bat iz root direktorijuma koji automatski startuje i frontend i backend u paralelnim prozorima.
🌍 Deploy priprema
🛠 Build frontend:

cd studentska-evidencija-frontend
npm run build

🔄 Kopiraj u backend:

Kopiraj sadržaj build/ foldera u:

studentska-evidencija-backend/src/main/resources/static/

🧱 Build backend:

cd studentska-evidencija-backend
./mvnw clean install

▶️ Pokreni .jar fajl:

java -jar target/evidencija-0.0.1-SNAPSHOT.jar

🧰 Tehnologije

    ✅ React 18

    ✅ Spring Boot 3.4.5

    ✅ Java 17

    ✅ MySQL 8

    ✅ Maven

    ✅ Axios, ESLint, H2 (dev)

👤 Autor

David Subotin
📎 GitHub: DavidSubotinDS