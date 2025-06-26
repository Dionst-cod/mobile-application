# Gebruik officiële Node.js image
FROM node:20

# Werkdirectory in container
WORKDIR /app

# Kopieer eerst package-info (slim voor caching)
COPY package*.json ./

# Installeer dependencies
RUN npm install

# Kopieer .env expliciet
COPY .env ./

# Kopieer de rest van de applicatie
COPY . .

# Prisma client genereren (nu is schema.prisma wél aanwezig)
RUN npx prisma generate

# Expose de poort (bijv. 3000)
EXPOSE 3000

# Start de server
CMD ["npm", "start"]
