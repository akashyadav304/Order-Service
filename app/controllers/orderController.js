import Order from "../models/orders.js"
import User from "../models/users.js"
import Product from "../models/products.js"

// Handler functions:

export const createOrder = async (req, res) => {
    const user_id = req.user.user_id;
    const user = await User.findByPk(user_id);

    const { product_id } = req.body;

    try {
        const order = await Order.create({
            user_id,
            product_id,
            shipping_address : user.address,
        });

        res.status(201).json({
            message: "Order created",
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};


export const getOrders = async (req, res) => {
    const user_id = req.user.user_id;
    const user = await User.findByPk(user_id);

    try {
        const orders = await Order.findAll({
            attributes : ["order_id", "shipping_address", "status",  "created_at"],
            where : {user_id},
            include : {
                model: Product,
                attributes: ["name", "description"]
            }
        });
        
        //Formatting the order details:
        const order_details = orders.map(order => ({
            order_id: order.order_id,
            product_name: order.Product.name,
            product_description: order.Product.description,
            shipping_address: order.shipping_address,
            order_date: order.created_at,
            status: order.status
        }));

        res.status(200).json({
            message: "Orders fetched successfully",
            user_name: user.name,
            order_details,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};


export const confirmOrder = async (req, res) => {
    try {
        const { order_id } = req.body;
        
        const order = await Order.findByPk(order_id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found!!",
            });
        }

        const product = await Product.findByPk(order.product_id);

        if(product.stock>0){
            order.status = "CONFIRMED";
            await order.save();
            product.stock -= 1;
            await product.save();
        } else {
            return res.status(404).json({ message: "Out of Stock!!" });
        }

        res.status(200).json({
            message: "Order confirmed!!"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
};

export const cancelOrder = async (req, res) => {
    const {order_id} = req.body;

    const order = await Order.findByPk(order_id);
    if(!order){
        return res.status(404).json({message: "Order not found!!"});
    }

    order.status = "CANCELLED"
    await order.save();

    res.status(200).json({message: "Order cancelled!!"});
};


export const deleteOrder = async (req, res) => {
    try {
        const {order_id} = req.body;

        const order = await Order.findByPk(order_id);
        if(!order){
            return res.status(404).json({message: "Order not found!!"});
        }

        order.row_status = "INACTIVE"
        await order.save();

        res.status(200).json({message: "Order deleted!!"});

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
};
