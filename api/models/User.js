import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Post from './Post.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

(async function () {
    await sequelize.sync({ force: true });
})();

export default User;