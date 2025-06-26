<<<<<<< HEAD
# README.md – _RACademic Backend_

## Over dit project

Dit is de backend van **RACademic**, een app waar studenten van de Hogeschool Rotterdam studiematerialen kunnen delen, beoordelen en opslaan als favoriet. Gebouwd met **Node.js**, **Express**, **JWT-authenticatie** en **Prisma ORM** met een **SQLite-database**.

---

## Project opstarten

### Voorvereisten

- [Node.js](https://nodejs.org/)
- [Docker & Docker Compose](https://docs.docker.com/compose/) _(aanbevolen voor eenvoud)_
- Een `.env` bestand in de root van het project met de volgende inhoud:

\`\`\`env
DATABASE_URL="file:./dev.db"
JWT_SECRET="supersecretkey"
\`\`\`

---

## Starten zonder Docker (lokale setup)

\`\`\`bash
npm install # Installeer dependencies
npx prisma generate # Genereer Prisma client
npx prisma migrate dev # (Optioneel) Initialiseert de database
node index.js # Start de server
\`\`\`

---

## Starten met Docker

1. Zorg dat je `.env` bestand correct is (zoals hierboven).
2. Start de container:
   \`\`\`bash
   docker-compose up --build
   \`\`\`
3. Backend draait op:  
   [http://localhost:3000](http://localhost:3000)

---

## Belangrijke scripts

| Script                     | Beschrijving                                           |
| -------------------------- | ------------------------------------------------------ |
| \`npm start\`              | Start de backend                                       |
| \`npx prisma studio\`      | Webinterface voor het bekijken van de SQLite database  |
| \`npx prisma migrate dev\` | Start/init database (alleen nodig bij schemawijziging) |

---

## Mappenstructuur

| Map             | Inhoud                                                                   |
| --------------- | ------------------------------------------------------------------------ |
| \`routes/\`     | Alle Express API-routes zoals \`auth.js\`, \`resource.js\`, \`admin.js\` |
| \`middleware/\` | Middleware zoals JWT-validatie                                           |
| \`utils/\`      | Hulpfuncties (\`generateToken\`, \`isAdmin\`)                            |
| \`prisma/\`     | Prisma schema-bestand (\`schema.prisma\`)                                |
| \`Dockerfile\`  | Containerconfiguratie voor backend                                       |
| \`.env\`        | Bevat o.a. \`DATABASE_URL\` en \`JWT_SECRET\` (wordt genegeerd door Git) |

---

## API-overzicht (selectie)

| Methode             | Endpoint             | Doel                                      |
| ------------------- | -------------------- | ----------------------------------------- |
| \`POST\`            | \`/auth/register\`   | Registreert gebruiker (alleen \`@hr.nl\`) |
| \`POST\`            | \`/auth/login\`      | Logt gebruiker in, geeft JWT              |
| \`GET/POST/DELETE\` | \`/admin/resources\` | Resources beheren                         |
| \`GET/POST\`        | \`/tags\`            | Tags ophalen of toevoegen                 |
| \`POST\`            | \`/admin/ban-email\` | Ban e-mailadres (alleen admin)            |
| \`POST\`            | \`/admin/promote\`   | Promoot gebruiker tot admin               |
| \`GET/POST/DELETE\` | \`/favorites\`       | Bronnen favoriet maken/verwijderen        |

---

## Gebruikte technologieën

- **Node.js + Express** – server & API
- **Prisma ORM** – datatoegang via \`schema.prisma\`
- **SQLite** – eenvoudige database voor lokaal gebruik
- **JWT** – gebruikersauthenticatie
- **Docker** – eenvoudige containerisatie
- **dotenv** – voor \`.env\` variabelen

---

## Status

- Backend klaar voor gebruik
- JWT beveiliging actief
- API's getest
- Frontend wordt nog geïntegreerd

## Belangrijke opmerking

De volgende bestanden en mappen zijn **uitgesloten** via `.gitignore` en `.dockerignore` in zowel de backend als frontend:

- `.env` (bevat o.a. `DATABASE_URL`, `JWT_SECRET`)
- `dev.db` (lokale databasebestand van Prisma)
- `node_modules/`
- `*.log`
- `package-lock.json`
- `build/` of `dist/` mappen (indien van toepassing)

Zorg ervoor dat deze bestanden aanwezig zijn bij lokaal draaien of deployment, ook al staan ze niet in de repository.
=======

>>>>>>> a34af8ff975e5692a27933df4778324d0c227e1f
