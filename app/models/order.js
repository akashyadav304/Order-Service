import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Order = sequelize.define("Order", {

  order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
  customer_name: { type: DataTypes.STRING, allowNull: false, },
  product_id: { type: DataTypes.INTEGER, allowNull: false, },
  product_name: { type: DataTypes.STRING, allowNull: false, },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "PENDING", },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, },
  user_id: { type: DataTypes.INTEGER, allowNull: false, },
  
}, {
  tableName: "orders",
  timestamps: false,
});

export default Order;