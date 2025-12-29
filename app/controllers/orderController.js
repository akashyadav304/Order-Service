import Order from "../models/order.js"

// Handler functions:

export const createOrder = async (req, res) => {
    const user_id = req.user.user_id;
    const customer_name = req.user.name;

    const { product_id, product_name, amount, status } = req.body;

    try {
        const order = await Order.create({
            customer_name,
            product_id,
            product_name,
            amount,
            status: status || "PENDING",
            user_id,
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
    try {
        const orders = await Order.findAll({
            where : {user_id : user.user_id}
        });

        res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
}


export const updateOrderStatus = async (req, res) => {
    try {
        const order_id = parseInt(req.params.id);
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
            });
        }

        const order = await Order.findByPk(order_id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.status = status;
        order.updated_at = new Date();

        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order_id = parseInt(req.params.id);

        if (isNaN(order_id)) {
            return res.status(400).json({
                message: "Invalid order id",
            });
        }

        const order = await Order.findByPk(order_id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        await order.destroy();

        res.status(200).json({
            message: "Order deleted successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error",
        });
    }
};
