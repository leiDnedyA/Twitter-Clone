import { sequelize } from "../db.js";
import Like from "./Like.js";
import Post from "./Post.js";
import User from "./User.js";
import Comment from "./Comment.js";


Like.hasOne(User);
User.hasMany(Like);

Post.hasOne(User);
User.hasMany(Post);

Like.hasOne(Post);
Post.hasMany(Like);

Like.hasOne(User);
User.hasMany(Like);

Comment.hasOne(User);
User.hasMany(Comment);

Comment.hasOne(Post);
Post.hasMany(Comment);


(async function () {
    // "force: true" deletes all data in table if exists
    await sequelize.sync({ 
        // force: true
    });
})();

export {
    Post, User, Like, Comment
}