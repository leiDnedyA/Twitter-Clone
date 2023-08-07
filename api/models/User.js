import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Post from './Post.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

(async function () {
    // "force: true" deletes all data in table if exists
    await sequelize.sync({ 
        // force: true
    });
})();

export default User;