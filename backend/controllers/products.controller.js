import Product from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProduct = asyncHandler(
    async (req,res,next) => {
        const { name, description, price, category, size, color, stock, image } = req.body;
        console.log("req body ", req.body)
        if(
            [name, description, price, category, size, color, stock, image].some((field)=>{
                return field === '';
            })
        ) {
            new ApiError(
                402,
                "All fields are required"
            )
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            size,
            color,
            stock,
            image,
        })  

        const product = await newProduct.save();

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "Product Created Successfully ",
                product
            )
        )

    }
)

const getSpecificProduct = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;
        if(
            !id
        ) {
            new ApiError(
                402,
                "id is required "
            )
        }


        const singleProduct = await Product.findById({_id: id});
        if(
            !singleProduct
        ) {
            new ApiError(
                404,
                "no products found "
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "single product ",
                singleProduct
            )
        )
    }
)

const getAllProducts = asyncHandler(
    async(req,res,next) => {
        const allProducts = await Product.find({});
        if(
            !allProducts
        ) {
            new ApiError(
                404,
                "no products found "
            )
        }


        console.log("products ", allProducts)

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "products ",
                allProducts
            )
        )
    }
)

const updateProduct = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;
        if(
            !id
        ) {
            new ApiError(
                402,
                "id is required"
            )
        }
        console.log("req body ", req.body);
        const update = await Product.findByIdAndUpdate(
            {_id : id},
            {
                ...req.body 
            },
            {
                new: true 
            }
        )

        console.log("update ", update)

        if(
            !update
        ) {
            new ApiError(
                402,
                "no updated product found "
            )
        }

         res.status(200).json(
            new ApiResponse(
                200,
                "Product updated successfully",
                update
            )
        );
    }
)

const deleteProduct = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;
        if(
            !id
        ) {
            new ApiError(
                402,
                "id is required "
            )
        }

        const deletep = await Product.findByIdAndDelete({_id: id});
        console.log("deletep ", deletep)

        if(
            !deletep
        ) {
            new ApiError(
                404,
                "no deleted product found "
            )
        }

         res.status(200).json(
            new ApiResponse(
                200,
                "Product deleted successfully",
                deletep
            )
        );
    }
)

const removeStockFromCart = asyncHandler(
    async(req,res,next)=>{
        const { id, quantity } = req.body;
        if(
            !id || !quantity
        ) {
            new ApiError(
                402,
                "id and quantity are required"
            )
        }

        const product = await Product.findById(id);
        if(
            !product
        ) {
            new ApiError(
                404,
                "Product not found"
            )
        }

        if(product.stock < quantity) {
            new ApiError(
                400,
                "Insufficient stock"
            )
        }

        product.stock -= quantity;
        await product.save();

        res.status(200).json(
            new ApiResponse(
                200,
                "Stock updated successfully",
                product
            )
        );
    }
)

export {
    createProduct,
    getSpecificProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    removeStockFromCart
}