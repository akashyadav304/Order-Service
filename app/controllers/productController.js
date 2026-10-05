import Product from "../models/products.js";

export const createProduct = async (req, res) => {

    const { name, price, stock, description, category } = req.body;

    await Product.create({
        name,
        price,
        stock,
        description,
        category
    });

    res.status(201).json({ message : "Product Created!!" });
};

export const getProducts = async (req, res) => {
    const productOb = await Product.findAll();
    
    if(productOb.length == 0){
        return res.status(404).json({ message: "No product found!!"});
    }
    
    res.status(200).json(productOb);
};

export const getProductsByCategory = async (req, res) => {
    const category = req.query.category;

    const productOb = await Product.findAll({ 
        where : {category}
    });
    
    if(productOb.length == 0){
        return res.status(404).json({ message: "No product found!!"});
    }
    
    res.status(200).json(productOb);
};

export const updateName = async (req, res) => {
    const {product_id, name : new_name} = req.body;

    const productOb = await Product.findByPk(product_id);

    if(!productOb){
        return res.status(404).json({ message : "Invalid ID!!"});
    }

    productOb.name = new_name;
    await productOb.save();

    res.status(200).json({ message : "Name updated successfully!!"})
};

export const updatePrice = async (req, res) => {
    const {product_id, price : new_price} = req.body;

    const productOb = await Product.findByPk(product_id);

    if(!productOb){
        return res.status(404).json({ message : "Invalid ID!!"});
    }

    productOb.price = new_price;
    await productOb.save();

    res.status(200).json({ message : "Price updated successfully!!"})
};

export const updateStock = async (req, res) => {
    const {product_id, stock : new_stock} = req.body;

    const productOb = await Product.findByPk(product_id);

    if(!productOb){
        return res.status(404).json({ message : "Invalid ID!!"});
    }

    productOb.stock += new_stock;
    await productOb.save();

    res.status(200).json({ message : "Stock updated successfully!!"})
};

export const updateCategory = async (req, res) => {
    const {product_id, category : new_category} = req.body;
    console.log(new_category);

    const productOb = await Product.findByPk(product_id);

    if(!productOb){
        return res.status(404).json({ message : "Invalid ID!!"});
    }

    productOb.category = new_category;
    await productOb.save();

    res.status(200).json({ message : "Category updated successfully!!"})
};

export const updateDescription = async (req, res) => {
    const {product_id, description : new_description} = req.body;

    const productOb = await Product.findByPk(product_id);

    if(!productOb){
        return res.status(404).json({ message : "Invalid ID!!"});
    }

    productOb.description = new_description;
    await productOb.save();

    res.status(200).json({ message : "Description updated successfully!!"})
};

export const deleteProduct = async (req, res) => {
    const { product_id } = req.body;

    const productOb = await Product.findByPk(product_id);

    if(!productOb){
        return res.status(404).json({ message : "Invalid ID!!"});
    }

    productOb.row_status = "INACTIVE";
    await productOb.save();

    res.status(200).json({ message : "Product deleted successfully!!"})
};