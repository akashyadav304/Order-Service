// CREATE TABLE users {
// 	user_id SERIAL PRIMARY KEY,
// 	name VARCHAR(255) NOT NULL,
// 	email VARCHAR(255) UNIQUE NOT NULL,
// 	password_hash TEXT NOT NULL,
// 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// };


import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const User = sequelize.define("Users", {

    user_id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true, },
    name : { type : DataTypes.STRING, allowNull : false, },
    email : { type : DataTypes.STRING, unique : true, allowNull : false, }, 
    password_hash : { type : DataTypes.TEXT, allowNull : false, },

}, {
    tableName : "users",
    timestamps : false 
});

export default User;