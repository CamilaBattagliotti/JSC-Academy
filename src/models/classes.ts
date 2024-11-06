import sequelize from "../database/db";
import { DataTypes, Model } from "../database/db";

const Classe = sequelize.define("Classe", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
// Classe.sync({force:true})
export default Classe;
