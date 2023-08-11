import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Action = sequelize.define("Action", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

(async function () {
    // "force: true" deletes all data in table if exists
    await sequelize.sync({ 
        // force: true
    });
})();

export default Action;