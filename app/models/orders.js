// CREATE TABLE orders (
//     order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

//     user_id UUID NOT NULL,
//     product_id UUID NOT NULL,
//     shipping_address TEXT NOT NULL,
    
//     status VARCHAR(30) NOT NULL DEFAULT 'PENDING', 
    
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     row_status VARCHAR(10) DEFAULT 'ACTIVE',
    
//     CONSTRAINT fk_user
//         FOREIGN KEY (user_id)
//         REFERENCES users(user_id),
        
//     CONSTRAINT fk_product
//         FOREIGN KEY (product_id)
//         REFERENCES products(product_id)
// );

import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import Product from "../models/products.js";

const Order = sequelize.define("Orders", {

    order_id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4, },
    user_id: { type: DataTypes.UUID, allowNull: false, },
    product_id: { type: DataTypes.UUID, allowNull: false, },
    shipping_address: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "PENDING", },
    row_status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ACTIVE'},
  
}, {
  tableName: "orders",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

//Association:
Order.belongsTo(Product, { foreignKey: "product_id"});

export default Order;