# Usa una imagen oficial de Node.js
FROM node:16

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de la aplicación en el contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Expón el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
