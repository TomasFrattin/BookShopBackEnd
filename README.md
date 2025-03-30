# Proyecto - Eccommerce Librería
### Descripción
Esta aplicación web facilita la compra y gestión de libros en una librería online. Los usuarios pueden registrarse, navegar por el catálogo, agregar productos al carrito y confirmar sus pedidos, enviando una notificación al dueño para su procesamiento. Por otro lado, el sistema incluye un panel administrativo donde se pueden gestionar libros y usuarios de manera eficiente. La plataforma cuenta con autenticación mediante tokens JWT, almacenamiento seguro de contraseñas y notificaciones a través de WhatsApp API, garantizando seguridad y escalabilidad en la experiencia de compra.

## Documentación de la API
HACERLA CON SWAGGER?
## Instalación
### Requisitos
Antes de comenzar, asegúrate de tener Node.js y npm instalados en tu máquina. Si no los tienes, sigue los pasos de instalación según tu sistema operativo.

### Instalar Node.js
**Windows:**
1. Descarga el instalador desde [Node.js - Download](https://nodejs.org/en/download/)
2. Ejecuta el archivo `.msi` y sigue las instrucciones de instalación.
3. Verifica la instalación ejecutando los siguientes comandos en una terminal:
```
node -v
npm -v
```
**Linux (Ubuntu):**
1. Abre la terminal.
2. Instala Node.js y npm ejecutando:
```
sudo apt update
sudo apt install nodejs npm
```
3. Verifica la instalación:
```
node -v
```

### Clonar el Repositorio
1. Abre la terminal.
2. Navega al directorio donde deseas clonar el proyecto.
3. Ejecuta los siguientes comandos:
```
git clone https://github.com/TomasFrattin/BookShopBackEnd.git
cd BookShopBackEnd
```
### Configuración e instalación de dependencias
1. Instalar dependencias del Backend:
```
npm install
```
2. Crea un archivo `.env` con las siguientes variables de entorno:
```
SECRET_KEY=bU8$r2V9^hw8eL0!kmRf7pX9lqN%j3
DATABASE_URL="mysql://root:root@localhost:3306/bookshopdb"
```

### Corriendo la Aplicación
El Frontend utiliza por defecto el siguiente link: `http://localhost:1234/` Para iniciarlo, desde la carpeta `BookShopBackEnd` que se creó en tu PC, ejecuta el siguiente comando en la terminal:
```
node app.js
```
**Nota:** Para correr la aplicación completa, asegúrate de correr previamente el backend, para lo cual puedes guiarte con el instructivo ubicado en el READ.ME del siguiente repositorio `https://github.com/TomasFrattin/BookShopFrontEnd`, de modo tal que tanto back como front estén corriendo al mismo tiempo. Si no, la aplicación no funcionará.

## Pruebas Unitarias
Las pruebas unitarias no fueron añadidas al repositorio, en su lugar se ha adjuntado el código pertinente con las imágenes en una documentación extra. Visita el siguiente enlace: [Documentación](https://docs.google.com/document/d/1ZLjh9Kx2-bB-oLU7uYlUz92_gIZkQiwpbj2OxiIJ_hI/edit?usp=sharing)
