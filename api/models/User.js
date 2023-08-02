import { sequelize } from './db';
import Post from './Post';

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

User.hasMany(Post);

(async() => {
    await sequelize.sync({ force: true });
})();

export default User;