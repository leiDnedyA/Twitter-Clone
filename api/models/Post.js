import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './User.js';

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

(async function () {
    // "force: true" deletes all data in table if exists
    await sequelize.sync({
        // force: true 
    });
})();

export default Post;