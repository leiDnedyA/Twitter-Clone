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
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

( async function() {
    await sequelize.sync({ force: true });
})();

export default Post;