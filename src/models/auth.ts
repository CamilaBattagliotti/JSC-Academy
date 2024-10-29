import sequelize, { DataTypes } from "../database/db";

const Auth = sequelize.define("Auth", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  password: {
    //password: string (8 caracteres como minimo, debe incluir numeros, letras en mayusculas y minusculas, y caracteres espaciales)
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La contraseña no puede estar vacía" },
    },
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El id de ususario es requerido" },
    },
  },
});
export default Auth;
