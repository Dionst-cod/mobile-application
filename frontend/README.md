# _Racademic Frontend_

Een mobiele applicatie (React Native) met backend (Node.js + Prisma + SQLite) voor het beheren, delen en beoordelen van leerbronnen.

---

## Functionaliteiten

### Gebruikers

- Registreren en inloggen (met JWT-authenticatie)
- Bronnen bekijken, zoeken en filteren
- Bronnen beoordelen (1–5 sterren)
- Bronnen als favoriet markeren
- Uitloggen

### eheerders

- Nieuwe bronnen toevoegen
- Tags koppelen
- Bronnen beheren via API

---

## Tech Stack

| Onderdeel    | Technologie             |
| ------------ | ----------------------- |
| **Frontend** | React Native (Expo)     |
| **Backend**  | Node.js, Express        |
| **Database** | SQLite via Prisma ORM   |
| **Auth**     | JWT + AsyncStorage      |
| **Docker**   | Docker & docker-compose |

---

## Installatie

### 1. Backend starten

```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma db seed
node index.js
```

### 2. Frontend starten

```bash
cd frontend
npm install
npx expo start
```

> Zorg dat de backend draait op `http://localhost:3000` of pas `apiconfig.js` aan indien nodig.

---

## Gebruiker logins (voor test)

| Rol     | Email         | Wachtwoord |
| ------- | ------------- | ---------- |
| Admin   | admin@hr.nl   | admin123   |
| Student | student@hr.nl | student123 |

---

## Structuur

```bash
/backend
  ├─ routes/
  ├─ prisma/schema.prisma
  ├─ auth.js, admin.js, resource.js
  ├─ index.js

/frontend
  ├─ screens/
  ├─ components/
  ├─ App.js, apiconfig.js
  ├─ navigation/
```

---

## Over dit project

Dit project is gemaakt als onderdeel van het vak **WP4 - Mobile Development** aan de Hogeschool Rotterdam. Het doel is om ervaring op te doen met het bouwen van een mobiele app met backend-integratie, beveiliging en moderne tooling.

---

## Belangrijke opmerking

De volgende bestanden en mappen zijn **uitgesloten** via `.gitignore` en `.dockerignore` in zowel de backend als frontend:

- `.env` (bevat o.a. `DATABASE_URL`, `JWT_SECRET`)
- `dev.db` (lokale databasebestand van Prisma)
- `node_modules/`
- `*.log`
- `package-lock.json`
- `build/` of `dist/` mappen (indien van toepassing)

Zorg ervoor dat deze bestanden aanwezig zijn bij lokaal draaien of deployment, ook al staan ze niet in de repository.

## Bedankt voor het bekijken!
