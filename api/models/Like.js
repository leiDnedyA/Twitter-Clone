import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Like = sequelize.define("Like", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

(async function () {
    // "force: true" deletes all data in table if exists
    await sequelize.sync({ 
        // force: true
    });
})();

export default Like;