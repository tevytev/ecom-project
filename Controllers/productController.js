// importing modules
const { db } = require('../Models');

// assigning users to the variable Products
const Product = db.products;

const getAllProducts = async (req, res) => {
    const { category } = req.query;
    if (category) {
            // if pricing query is included in request, filter out all products that do not match category parameter
        if (req.priceAdjustedProducts) {
            const uncategorizedProducts = req.priceAdjustedProducts;
            const categorizedProducts = uncategorizedProducts.filter(obj => obj.category === category);

            return res.status(200).send(categorizedProducts);
        } else {
            try {
                // Find all products in specific category
                const products = await Product.findAll({
                    attributes: ['name', 'price', 'category'],
                    where: {
                        category: category
                    }
                });
        
                if (products) {
                    return res.status(200).send(products);
                } else {
                    res.status(404).send("Could not fetch products");
                }
            } catch (error) {
                console.log(error);
            }
        };
    } else {
        if (req.priceAdjustedProducts) {
            try {
                // Send all price adjusted products
                const products = req.priceAdjustedProducts;
                
                if (products) {
                    return res.status(200).send(products);
                } else {
                    res.status(404).send("Could not fetch products");
                }
        
            } catch (error) {
                console.log(error);
            }
    
        } else {
            try {
                // Find all products
                const products = await Product.findAll({
                    attributes: ['name', 'price', 'category']
                });
    
                if (products) {
                    return res.status(200).send(products);
                } else {
                    res.status(404).send("Could not fetch products");
                }
    
            } catch (error) {
                console.log(error);
            }
        }
    };
};

const getProductById = async (req, res) => {
    const { productId } = req.params

        try {
            // Find product with specific id
            const product = await Product.findOne({
                attributes: ['name', 'price', 'category'], 
                where: {
                    id: productId
                }
            });
    
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send('product not found');
        }
        } catch (error) {
            console.log(error);
        }
};

module.exports = {
    getAllProducts,
    getProductById,
}