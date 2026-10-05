// CREATE TABLE products (
//     product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     name VARCHAR(255) NOT NULL,
//     price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
//     stock INT NOT NULL CHECK (stock >= 0),
//     description TEXT DEFAULT 'No description available',
//     category VARCHAR(50) NOT NULL,   
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     row_status VARCHAR(10) DEFAULT 'ACTIVE'
// );

import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Product = sequelize.define("Products", {

    product_id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4, },
    name: { type: DataTypes.STRING, allowNull: false, },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0, }},
    stock: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0, } },
    category: { type: DataTypes.STRING, allowNull: false, },
    description: { type: DataTypes.TEXT, defaultValue: 'No description available'},
    row_status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ACTIVE'},
  
}, {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export default Product;