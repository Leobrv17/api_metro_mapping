# Utilisation d'une image Node.js de base
FROM node:22-slim

# Définition du répertoire de travail
WORKDIR /app

# Copie du fichier package.json et package-lock.json (pour npm install)
COPY package.json ./

RUN apt-get update -y && apt-get install -y openssl

# Installation des dépendances
RUN npm install

# Copie du reste du code source de l'API dans le conteneur
COPY . .
COPY .env .env

RUN npx prisma generate

# Exposition du port sur lequel le serveur écoute
EXPOSE 3000

CMD ["node", "server.js"]