import { sequelize } from './db';
import User from './User';

const Post = sequelize.define('Post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    UserId: {
        type: Sequelize.INTEGER
    }
})

Post.belongsTo(User);

(async() => {
    await sequelize.sync({ force: true });
})();

export default Post;