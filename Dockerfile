# Utilisation d'une image Node.js de base
FROM node:18

# Définition du répertoire de travail
WORKDIR /app

# Copie du fichier package.json et package-lock.json (pour npm install)
COPY package.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code source de l'API dans le conteneur
COPY . .

# Exposition du port sur lequel le serveur écoute
EXPOSE 3000

RUN npx prisma generate


# Commande de lancement de l'application
CMD ["node", "server.js"]