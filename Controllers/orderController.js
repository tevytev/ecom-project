// importing modules
const { db, OrderProducts } = require('../Models');
const Order = db.orders;
const Product = db.products;

const getAllOrders = async (req, res) => {
    const userId = req.userId;

    try {
        const orders = await Order.findAll({
            where: { userId: userId },
            include: Product
        })

        if (orders) {
            res.status(200).send(orders);
        } else {
            res.status(404).send('could not find orders');
        }
    } catch (error) {
        console.log(error);   
    }
};

const getOrderById = async (req, res) => {
    const userId = req.userId;
    const { orderId } = req.params;

    try {
        const order = await Order.findOne({
            where: {
                userId: userId,
                id: orderId
            },
            include: Product
        });

        if (order) {
            res.status(200).send(order);
        } else {
            res.status(404).send('could not find order');
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllOrders,
    getOrderById
}