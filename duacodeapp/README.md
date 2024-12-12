# 🖥️ **Frontend - React**
![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Version](https://img.shields.io/badge/version-1.0.0-blue)  ![Issues](https://img.shields.io/github/issues/usuario/repositorio)![React](https://img.shields.io/badge/React-16.13.1-61dafb) ![Axios](https://img.shields.io/badge/Axios-0.27.2-5A29E3) ![useReducer](https://img.shields.io/badge/Hook-useReducer-green) ![Carrito Funcional](https://img.shields.io/badge/Carrito-Funcional-brightgreen) ![useContext](https://img.shields.io/badge/Hook-useContext-yellow) ![React Magic Motion](https://img.shields.io/badge/React_Magic_Motion-2.0.0-ff69b4)

**Descripción:**  
Este es el frontend de la aplicación, desarrollado con **React**, utilizando el comando `create-react-app` para la creación del proyecto. El proyecto usa **npm** para la gestión de dependencias.

## 📋 Requisitos mínimos

- **Node.js:** Versión 16 o superior.
- **npm:** Instalado junto con Node.js.

## 🚀 Instrucciones de instalación y uso Local

1. Clona este repositorio en tu máquina local:(SSh o HTTPS)
    ```bash
    git clone git@github.com:eliasmm04/DriveANDDunk.git
    git clone https://github.com/eliasmm04/DriveANDDunk.git
    ```
2. Entra en el directorio del proyecto:
    ```bash
    cd duacodeapp
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Ejecuta la aplicación:
    ```bash
    npm run start
    ```
5. La aplicación estará disponible en:  
   [http://localhost:3000](http://localhost:3000).

---

## 📘 Comenzando con **Create React App**

Este proyecto fue inicializado con [Create React App](https://github.com/facebook/create-react-app).

### 🛠️ **Scripts disponibles**

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- **`npm start`**  
  Ejecuta la aplicación en modo de desarrollo.  
  Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.  
  La página se recargará cuando realices cambios.  
  También podrías ver errores de lint en la consola.

- **`npm test`**  
  Ejecuta el runner de pruebas en modo interactivo.  
  Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

- **`npm run build`**  
  Construye la aplicación para producción en la carpeta `build`.  
  Empaqueta correctamente React en modo de producción y optimiza la construcción para el mejor rendimiento.  
  La construcción se minifica y los nombres de archivo incluyen los hashes.  
  ¡Tu aplicación está lista para ser desplegada! ¡Importante a la hora de hacer deploy! 

---

## 🎨 Personalización de la UI

Este proyecto utiliza **React Magic Motion** para animaciones y efectos en la interfaz de usuario, proporcionando una experiencia interactiva y fluida. Si deseas personalizar las animaciones, revisa el archivo de configuración de **MagicMotion**.

---

## ✅ **Resumen para Iniciar la Aplicación**

Para iniciar la aplicación, asegúrate de tener lo siguiente instalado:

- **Node.js** (Versión 16 o superior).
- **npm** (gestor de paquetes que se instala junto con Node.js).

Sigue estos pasos:

1. Dirígete a la carpeta donde se encuentra el directorio `src`.
2. Usa el siguiente comando para iniciar el servidor de desarrollo:
   ```bash
   npm run start
    ```

## 🚀 Instrucciones de instalación y uso (desplegada)
1. La aplicación ya esta desplegada(FireBase)
2. Si se quiere actualizar solo hay que hacer
   ```bash
   firebase init
   ```
Eso solo si se quiere hacer algún cambio de configuración etc...
La capeta en la cual se basa React para hacer un deploy es en la carpeta build por lo que es la que se usuara.

Crear una app optimizada con:
   ```
   bash
   npm run build
   ```
Cuando acabe se hara finalmente el deploy con 

  ```
   bash
   firebase deploy
   ```