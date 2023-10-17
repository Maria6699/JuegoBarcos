# proyecto22_
Proyecto de Procesos 22-23
Repositorio para el proyecto de la asignatura procesos de software para el año 2022/2023, en ESIIAB - UCLM

# Descripción
En principio el proyecto será un juego de hundir el barco (Hasta ahora solo esta definido como juego indefinido), donde esta definida la arquitectura (SaaS) a grandes rasgos, así como algunas funciones:

  -El usuario puede iniciar sesión con un nick(único) de no más de 6 letras, no hay contraseña.
  
  -El usuario puede ,una vez con la sesión iniciada, crear una partida a la cual el sistema le asigna un código.Estas partidas son de dos usuarios.
  
  -El usuario puede ver una lista de las partidas disponibles(aquellas que solo cuentan con un jugador y unirse a la que desee dandole click al nombre de la partida, una   vez se una la partida pasará a la fase de "jugando" y el sistema notificará a ambos usuarios de que se empiece a jugar.
  
  -El usuario puede salir de la sesión dandole al botón "salir" el cual hará que se cierren las partidas de las que forma parte y las finalizará.

# Instrucciones
- En caso de clonar el repositorio:

  1. Tener Node.js instalado:
  ```
  https://nodejs.org/es/download/
  ```
  
  2. Realizar la clonación o descargarse el proyecto desde el repositorio
  
  3. En el terminal escribir para instalar los paquetes necesarios:
  
  ```
  npm install
  ```
  
  4. En el terminal escribir para iniciar el juego, esto lanzará sobre el puerto que haya escrito (por defecto 3001) la aplicación:
  ```
  npm start
  ```
  
  5. Se puede acceder a la aplicación en el siguiente enlace: 
  
  ```
  http://localhost:3001/
  ```
  
- También se puede acceder al juego en el siguiente enlace, desplegado en un servicio de google cloud (sin necesidad de realizar los pasos anteriores):

  ```
  https://proyectoprocesos-fmd4gg64ea-ew.a.run.app
  ```
  # Video Explicativo
  https://pruebasaluuclm-my.sharepoint.com/:v:/g/personal/maria_gomez60_alu_uclm_es/EUopHJbA699OgxPZ8UJCw-wBbIXOL9ZKXmrQOxt2lG9SMw
