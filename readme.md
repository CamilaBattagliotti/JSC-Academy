
# Proyecto Final Backend - Gestión de Usuarios y Clases -

¡Bienvenides a nuestro último desafío en el curso de Desarrollo Backend con Node.js! 

Este proyecto es el resultado de dos semanas de horas de código, trabajo en equipo y mucho mate, fideos y risas. 


##  📚 Descripción del Proyecto

Creamos un sistema de autenticación y administración de usuarios que permite:

- ABM de Clases: Las clases a las que los usuarios pueden inscribirse, con opciones de vinculación y desvinculación.
- Registro y Autenticación: Creación de cuenta, inicio y cierre de sesión de usuarios.
- Actualización y Borrado de Usuarios: Gestión completa de los datos de usuario y eliminación en cascada.
- Roles y Seguridad: Control de acceso y robustas medidas de seguridad.

## ⚙️ Tecnologías Utilizadas

- Backend: Node.js, Express, Sequelize, PostgreSQL
- Autenticación: JWT (JSON Web Tokens) con Refresh Tokens
- Validación: ZOD
- Seguridad: Contraseñas encriptadas con salt, HelmetJS para protección de cabeceras HTTP, WinstonJS para logging

## 🏗️ Arquitectura REST con MVC

Nos aseguramos de seguir la estructura REST y el patrón MVCS para un código limpio y fácil de escalar. ¡Todo está organizado y cada capa cumple su rol al pie de la letra!

## 📋 Funcionalidades

- ABM de Clases: CRUD completo de clases.
- Registro y Login y Logout de Usuarios: Incluye validación de contraseña y email y lista negra de tokens expirados y revocados.
- Inscripción a Clases: Los usuarios pueden inscribirse y desvincularse de clases a través de relaciones entre entidades.
- Seguridad y Autenticación Avanzadas: Sistema de Refresh Tokens para sesiones prolongadas y HelmetJS para mejorar la seguridad.




## 📖 Documentación y Deploy
La API está documentada en Swagger. Consulta los detalles y ejemplos de cada endpoint en nuestro [Swagger Online](https://eloquent-freedom-production.up.railway.app/api-docs/)

La API y la base de datos están desplegadas en [Railway](https://eloquent-freedom-production.up.railway.app)

## 👩‍💻 Team Backend 👨‍💻

Nos presentamos, ¡el equipazo que hizo esto posible!

### ♓ Cami
[Github](https://github.com/CamilaBattagliotti) -  [Linkedin](https://www.linkedin.com/in/camila-battagliotti/)
### ♒ Jime 
[Github](https://github.com/JimeJai) -  [Linkedin](https://www.linkedin.com/in/jimena-miramontes-265800310/)
### ♎ Sofi
[Github](https://github.com/Sofiferrer) -  [Linkedin](https://www.linkedin.com/in/ferrer-sofia/)
