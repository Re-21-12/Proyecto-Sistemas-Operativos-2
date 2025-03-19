# Usa una imagen ligera de Node.js
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias y hacer instalación
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Usar nodemon en desarrollo
CMD ["npx", "nodemon", "server.js"]

# Exponer el puerto 3000
EXPOSE 3000
