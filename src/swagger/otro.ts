//user/ "post": {
//   "summary": "Crear un nuevo usuario",
//   "description": "Crea un nuevo usuario en el sistema.",
//   "requestBody": {
//     "required": true,
//     "content": {
//       "application/json": {
//         "schema": {
//           "$ref": "#/components/schemas/UserInput"
//         }
//       }
//     }
//   },
//   "responses": {
//     "201": {
//       "description": "Usuario creado exitosamente",
//       "content": {
//         "application/json": {
//           "schema": {
//             "type": "object",
//             "properties": {
//               "message": {
//                 "type": "string",
//                 "example": "User created"
//               },
//               "data": {
//                 "$ref": "#/components/schemas/User"
//               }
//             }
//           }
//         }
//       }
//     },
//     "400": {
//       "description": "Datos inválidos"
//     }
//   }
// }

// "/users/email": {
//       "post": {
//         "summary": "Obtener usuario por email",
//         "description": "Obtiene un usuario en base a su email.",
//         "requestBody": {
//           "required": true,
//           "content": {
//             "application/json": {
//               "schema": {
//                 "type": "object",
//                 "properties": {
//                   "email": {
//                     "type": "string",
//                     "example": "user@example.com"
//                   }
//                 }
//               }
//             }
//           }
//         },
//         "responses": {
//           "200": {
//             "description": "Usuario encontrado",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "type": "object",
//                   "properties": {
//                     "data": {
//                       "$ref": "#/components/schemas/User"
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           "404": {
//             "description": "Usuario no encontrado"
//           }
//         }
//       }
//     }
