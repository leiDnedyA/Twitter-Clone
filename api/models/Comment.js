import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

(async function () {
    // "force: true" deletes all data in table if exists
    await sequelize.sync({ 
        // force: true
    });
})();

export default Comment;