# **KrugerVac- Reto Kanterita**


Es importante señalar que el front end y el back end de la aplicación fueron desarrollados simultáneamente. Sin embargo, no se logró terminarla por completo.

**Frontend**: elaborado con [Angular CLI](https://github.com/angular/angular-cli) versión 13.3.3.

**Backend**: elaborado con node.js v16.14.2

<br>


## **DESCRIPCIÓN**

<br>

- El administrador puede crear empleados, actualizar la información básica de estos, listarlos y eliminarlos (no son eliminados, se les coloca como inactivos en el sistema).

- El empleado puede registrar y actualizar su información adicional. Además de poder listar y registrar vacunas.

<br>

## **TEMAS** 

<br>

A continuación, se presenta los temas fundamentales aplicados en la elaboración de esta aplicación:

<br>


## **Frontend** 

1. Peticiones desde Angular al backend mediante el uso del módulo HttpClient
2. Manejo de JWT (Json Web Token)
3. Lazyload y rutas
4. Protección de rutas con Guards
5. Formularios Reactivos
6. Validaciones síncronas (uso de required y pattern) y asíncronas (para verificar que la cédula no se encuentre ya registrada, esto se utilizó en la parte del formulario "crear usuario")
7. Mantener el estado del usuario (lógica en el servicio "auth" y localStorage)
8. Manejo de errores 
9. Uso de Observables (of) y Operadores (map , swichMap, tap) de RxJS.
10. SweetAlert2 (para los mensajes emergentes)

<br>


## **Backend** 

El repositorio del backend se encuentra en: https://github.com/Miguel-Parra/KrugerVac-Backend-Node

### **Express**
 Framework que permitió crear la API. Aqui se implementó:
 - Rutas y controladores
 - Middlewares para servir el directorio público, leer el body de las peticiones, colocar los CORS y enlazar las rutas.
 - middlewares personalizados para validar los tokens 

### **Postgresql**

Para la persistencia de datos se utilizó la base de datos Postgresql. mediante una instancia gratuita de Heroku.'

Aqui se crearon 2 funciones para manejar la creacion del empleado: 
1. Para el resgitro en la tabla empleado y registro en la tabla rol_empleado
2. Para el registro en la tabla empleado_vacuna y actualizacion del estado vacunado en la tabla empleado

El módelo de la base y el script para la creación de esta se encuentran en la carpeta assets. 

En el archivo **.env** que se encuentra en el repositorio del backend podemos visualizar los datos necesarios para conectarnos a la base de datos de postresql (en el caso de que no se quiera usar la local)

### **Node-postgresql**

Paquete utilizado para interactuar con la base de datos PostgreSQL.
### **Bcryptjs**
 Paquete que Node que permitió encriptar la contraseña mediante un hash de una sola vía.

### **Express-validator**

 Paquete de Node que contiene una gran colección de Middlewares utilizados para las validaciones, por el momento se utilizó en los cammpos de las rutas relacionadas a la autenticación del usuario. 
### **Dotenv**
 Paquete que Node que permitió crear las variables de entorno utilizadas de manera local en el proyecto. 

### **JSON Web Token**
 Utilizado para autenticar y validar al cliente en el backend.
 
### **Heroku**
 Plataforma utilizada para desplegar el proyecto. 

<br>

## **HEROKU**

<br>

La aplicación se encuentra desplegada en:

https://kruger-vac-reto.herokuapp.com/#/auth/login

**Por favor** recargar el navegador varias veces ya que Heroku "duerme" a las aplicaciones cuando se encuentran en desuso.

<br>

## **USUARIOS DE PRUEBA**

<br>


- usuario: **MAPARRA**  rol: **administrador**   contraseña: **1722305230**

- usuario: **PGVALENCIA**   rol: **empleado**    contraseña: **1727402222**


<br>

## **CONSTRUCCIÓN Y EJECUCIÓN**

Recuerden reconstruir los módulos de Node tanto front end como del back end con:
```
npm install 
```
Para correr la aplicación de angular:
```
ng serve -o
```
Para correr el back en modo de desarrollo:
```
npm run dev
```
Para correr el back en modo de produccion:
```
npm start