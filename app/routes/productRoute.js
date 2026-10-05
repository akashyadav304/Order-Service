import express from "express";
import {
    getProducts,
    getProductsByCategory,
    createProduct,
    updateName,
    updatePrice,
    updateStock,
    updateCategory,
    updateDescription,
    deleteProduct
} from "../controllers/productController.js";


const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);
router.get("/category", getProductsByCategory);
router.patch("/updateName", updateName);
router.patch("/updatePrice", updatePrice);
router.patch("/updateStock", updateStock);
router.patch("/updateCategory", updateCategory);
router.patch("/updateDescription", updateDescription);
router.patch("/deleteProduct", deleteProduct);

export default router;