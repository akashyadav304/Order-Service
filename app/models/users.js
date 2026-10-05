// CREATE TABLE users (
//     user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE,
//     phone_no VARCHAR(15) NOT NULL UNIQUE,
//     password_hash TEXT NOT NULL,
//     address TEXT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     row_status VARCHAR(10) DEFAULT 'ACTIVE'
// );


import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const User = sequelize.define("Users", {

    user_id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4, },
    name: { type: DataTypes.STRING, allowNull : false, },
    email: { type: DataTypes.STRING, unique: true, allowNull: true}, 
    phone_no: { type: DataTypes.STRING, unique: true, allowNull: false, }, 
    password_hash : { type: DataTypes.TEXT, allowNull : false, },
    address : { type: DataTypes.TEXT },
    row_status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ACTIVE'},

}, {
    tableName : "users",
    timestamps : true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export default User;