// importing modules
const { db, CartProducts } = require('../Models');
const User = db.users;
const Product = db.products;
const Cart = db.carts;
const Order = db.orders;

const getCart = async (req, res) => {

    const cartId = req.cartId;

    const cart = await Cart.findOne({
        where: { id: cartId },
        include: Product
      });

    if (cart) {
        return res.status(200).send(cart);
    } else {
        return res.status(404).send('user cart not found')
    }
};

const insertIntoCartProducts = async (req, res) => {

    const productId = req.params.productId;
    const cartId = req.cartId;
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({
            where: {
                id: cartId,
                userId: userId
            }
        });

        const product = await Product.findOne({
            where: {
                id: productId
            }
        });

        if (cart && product) {

            // check if user is adding a repeat product to cart, incrementing the quantity
            const repeatProductCheck = await cart.hasProduct(product);
            if (repeatProductCheck) {

                const repeatedItem = await CartProducts.findOne({
                    where: {
                        productId: productId 
                    }
                });
                await CartProducts.update({
                    quantity: repeatedItem.quantity + 1
                }, {
                    where: {
                        productId: productId
                    }
                });

                const newCart = await Cart.findOne({
                    where: {
                        id: cartId,
                        userId: userId
                    },
                    include: Product
                });
                
                res.status(201).send(newCart);
            // if user is adding a new product to cart then only add item with quantity of one
            } else {
                await cart.addProduct(product, { through: { quantity: 1 } });
                const newCart = await Cart.findOne({
                    where: {
                        id: cartId,
                        userId: userId
                    },
                    include: Product
                });

                res.status(201).send(newCart);
            }
        } else {
            res.status(400);
        }

    } catch (error) {
        console.log(error);
    }

};

const deleteCartProducts = async (req, res) => {

    const productId = req.params.productId;
    const cartId = req.cartId;
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({
            where: {
                id: cartId,
                userId: userId
            }
        });

        const product = await Product.findOne({
            where: {
                id: productId
            }
        });

        if (cart && product) {
            await cart.removeProduct(product, {through: 'cart_products'});

            const newCart = await Cart.findOne({
                where: { id: cartId },
                include: Product
              });

            res.status(200).send(newCart);
        } else {
            return res.send('damn it aint work');
        }
    } catch (error) {
        console.log(error);
    }    
};

const checkoutCart = async (req, res) => {

    const cartId = req.cartId;
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({
            where: { id: cartId },
            include: Product
          });

          const user = await User.findOne({
            where: { id: userId }
          });
    
        const order = await Order.create();
        await user.addOrder(order);
    
        if (order) {
            for (const obj of cart.products) {
                const productId = obj.id;
                const product = await Product.findOne({
                    where: { id: productId }
                });

                const CartProduct = await CartProducts.findOne({
                    where: {
                        cartId: cartId,
                        productId: productId
                    }
                });
        
                await order.addProduct(product, { through: { quantity: CartProduct.quantity }});
                await cart.removeProduct(product, { through: 'cart_products' });
            }

            const newOrder = await Order.findOne({
                where: { id: order.id },
                include: Product
              });

            res.status(201).send(newOrder);

        } else {
            res.staus(400).send('could not finalize order, try again.')
        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getCart,
    insertIntoCartProducts,
    deleteCartProducts,
    checkoutCart
}