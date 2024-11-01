# prueba_tecnica_tia
Base de datos: MongoDB

Backend: ExpressJS

Frontend: ReactJS

# Carpetas
backend: Tiene la resolución de la prueba. 
  El archivo .env contiene las variables de entorno como la URL a la BD, el token privado.
  Contiene una carpeta config, la cual tiene el archivo necesario para mantener la conexion con la base de datos, la cual es en MongoDB y esta por default en el puerto 27017. Y la base de datos se llama tiaDB
  Esta tiene carpeta models que son todos los modelos creados para la resolución (userModel, reservaModel, vueloModel)
  Contiene una carpeta controllers, la cual contiene cada controlador necesario para realizar las diferencias acciones requeridas como crearReserva.
  Por último esta la carpeta routes la cual tiene todas las rutas necesarias para acceder a cada requerimiento de la API.

frontend: Se realizó una pequeña interfaz para poder mostrar las diferentes acciones, aunque la prueba no lo requería.
  Para acceder por default se crea un usuario admin.
  correo: admin  password: admin

# Ejecución
Como se mencióno anterior mente en el backend, el archivo .env contiene la url de la base de datos en el caso de ser necesario cambiar.
En ella se crea una base de datos tiaDB (crear manualmente si es necesario)
## Backend
  1.  Primero inicializar la base de datos con valores predeterminados, como es el usuario administrador y vuelos.
  2.  En la carpeta ./backend, desde un CMD ejecutar el comando 'npm install'
  3.  Posteriormente, ejecutar el comando 'node data.js'. Este comando llenará la base de datos con el usuario, reserva y vuelos necesarios para poder realizar las pruebas en postman.
  4. Por último, inicializamos la API con el comando 'npm start', la api se alojará en el puerto 3000 por default (cambiar en el archivo .env si es necesario).
      #### IMPORTANTE: No cerrar esta ventana de comandos (CMD).
## Frontend
  1.  Ahora necesitamos inicializar el frontend
  2.  En la carpeta ./frontend/frontend, desde un CMD ejecutar el comando 'npm install'
  3.  Para finalizar, ejecutamos el comando 'npm start'. Con esto se nos abrirá la ventana donde se mostrará la interfaz donde podremos registrarnos, o iniciar sesión con las credenciales.
      ### correo: admin  password: admin
#### IMPORTANTE: La interfaz se alojará por default en el puerto 3001, cambiar en el archivo ../frontend/.env si es necesario.
      
