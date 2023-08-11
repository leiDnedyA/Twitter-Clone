import { sequelize } from "../db.js";
import Action from "./Action.js";
import Post from "./Post.js";
import User from "./User.js";

// Do associations here
Action.hasOne(User);
User.hasMany(Action);
Post.hasOne(User);
User.hasMany(Post);

(async function () {
    // "force: true" deletes all data in table if exists
    await sequelize.sync({ 
        // force: true
    });
})();

export {
    Action, Post, User
}