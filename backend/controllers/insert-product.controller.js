import Product from "../models/products.model.js";

const insertProduct = async (req, res) => {
    try {
        const response = await Product.insertMany([
            {
                name: "Classic White Shirt",
                description: "A timeless white shirt perfect for formal occasions.",
                price: 29.99,
                category: "Shirts",
                size: "M",
                color: "White",
                stock: 120,
                image: "https://cdn.pixabay.com/photo/2016/03/27/22/22/fashion-1283863_1280.jpg",
                createdAt: "2025-08-19T14:00:00Z"
            },
            {
                name: "Slim Fit Jeans",
                description: "Stylish slim fit jeans for everyday wear.",
                price: 49.99,
                category: "Pants",
                size: "L",
                color: "Blue",
                stock: 80,
                image: "https://cdn.pixabay.com/photo/2016/11/29/03/53/adult-1867483_1280.jpg",
                createdAt: "2025-08-19T14:01:00Z"
            },
            {
                name: "Cozy Knit Sweater",
                description: "Warm and cozy sweater for chilly days.",
                price: 39.99,
                category: "Sweaters",
                size: "S",
                color: "Gray",
                stock: 60,
                image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/adult-1867889_1280.jpg",
                createdAt: "2025-08-19T14:02:00Z"
            },
            {
                name: "Black Formal Trousers",
                description: "Elegant black trousers for formal events.",
                price: 45.00,
                category: "Pants",
                size: "M",
                color: "Black",
                stock: 100,
                image: "https://cdn.pixabay.com/photo/2016/11/29/03/53/adult-1867484_1280.jpg",
                createdAt: "2025-08-19T14:03:00Z"
            },
            {
                name: "Striped Polo Shirt",
                description: "Casual striped polo shirt with a modern fit.",
                price: 25.50,
                category: "Shirts",
                size: "L",
                color: "Red",
                stock: 75,
                image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/adult-1867890_1280.jpg",
                createdAt: "2025-08-19T14:04:00Z"
            }
        ]);

        res.status(201).json({ message: "Products inserted successfully", data: response });
    } catch (error) {
        console.error("Error occurred while inserting product", error);
        res.status(500).json({ message: "Error occurred while inserting products", error });
    }
};

export default insertProduct;
