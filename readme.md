<h1 align="center">  DESAFÍO FINAL  </h1>
<h4 align="center"> Desarrollo Backend con NodeJS </h4>

¡FELICITACIONES por haber llegado hasta acá! Ahora sólamente queda este último trabajo grupal... ¡Qué lo disfruten!

---

Desarrollar un sistema de autenticación y administración de usuarios que permita:

- ABM de clases: CRUD de clases a la que asistirán los usuarios

- Register: Crear un nuevo usuario
- Login: Inicio de sesión
- Logout: Cierre de sesión
- Update: Actualizar la información relativa a un usuario
- Delete: Eliminar un usuario (se tiene que borrar tanto el registro del usuario como del de auth)
- Desvincularse de una clase
- Ingresar a una nueva clase

Este backend tiene que tener arquitectura REST y MVCs, así que repasen y piensen bien el nombre de los endpoints, qué rol cumple cada capa de la app, etc...

La entidad usuario tiene los siguientes campos:

- id: string
- username: string
- fullname: string
- password: string (8 caracteres como minimo, debe incluir numeros, letras en mayusculas y minusculas, y caracteres espaciales)
- email: string
- birthdate: Date
- nationality: string

La entidad clase tiene los siguientes campos:

- id: string
- name: string
- startDate: Date
- endDate: Date

INVESTIGAR CÓMO RELACIONAR LAS ENTIDADES ENTRE SÍ, CARDINALIDAD, ETC

#### A TENER EN CUENTA

- Investigar que cosa son los refresh tokens, para qué se usan, e implementarlos. Siempre respetando la arquitectura REST.
- Implementar WinstonJS. Úsenla donde ustedes juzgen necesario.
- Implementar paginación.
- Para este proyecto NO pueden usar ElephantSQL, tienen que usar otro servicio de Postgres as a Service.
- Investigar qué cosa es HelmetJS, para qué sirve e implementarlo. Pista: hay un apartado en la documentación de Express que hace referencia a esta herramienta.

<h2 align="center"> CONDICIONES DE APROBACIÓN </h2>

- El código tiene que estar 100% operativo, sin fallas ni errores no tratados. Así que dediquen un buen tiempo a testear todo.
- El archivo README.md tiene que incluir un link a la documenetación online hecha con Postman. Incluir ejemplos claros.
- Usar bases de datos relacionales con Sequelize y PostgreSQL.
- Usar variables de entorno e inicializarlo en un módulo aparte.
- Tomar todas las medidas de seguridad vistas en clase:
  - No filtrar llaves de acceso
  - Encriptar contraseñas
  - Usar salt.
  - Usar JWT e implementarlo mediante middlewares.
- Validar datos con ZOD.
- NO INCLUIR COMENTARIOS, a menos de que sea para explicar el por qué tomaron cierto camino, en caso de ser necesario.
- NO INCLUIR CONSOLE.LOG()

#### LINKS DE AYUDA

- [WinstonJS](https://www.npmjs.com/package/winston?activeTab=dependents)
- [Guia completa de WinstonJS](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/)
- [Cardinalidad BB.DD](https://help.tableau.com/current/pro/desktop/es-es/cardinality_and_ri.htm)
