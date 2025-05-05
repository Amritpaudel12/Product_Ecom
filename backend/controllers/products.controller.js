import Product from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProduct = asyncHandler(
    async (req,res,next) => {
        const { name, description, price, category, size, color, stock, image } = req.body;
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

        const update = await Product.findByIdAndUpdate(
            {_id : id},
            {
                ...req.body 
            },
            {
                new: true 
            }
        )

        if(
            !update
        ) {
            new ApiError(
                402,
                "no updated product found "
            )
        }

        res.status(
            200,
            "update product ",
            update 
        )
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

        if(
            !deletep
        ) {
            new ApiError(
                404,
                "no deleted product found "
            )
        }

        res.status(
            200,
            new ApiResponse(
                200,
                "product deleted successfully ",
                deletep 
            )
        )
    }
)

export {
    createProduct,
    getSpecificProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
}