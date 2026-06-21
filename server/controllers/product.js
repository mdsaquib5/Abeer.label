import Product from "../models/productSchema.js";
import {
    uploadToCloudinary,
    deleteFromCloudinary,
} from "../utils/cloudinaryHelper.js";


// add new product
export const addProduct = async (req, res) => {
    try {
        const imageFiles = req.files?.images || [];
        const videoFile = req.files?.video?.[0];

        if (!imageFiles.length) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required",
            });
        }

        const uploadedImages = [];

        for (const file of imageFiles) {
            const uploaded = await uploadToCloudinary(
                file.buffer,
                "abeer-label/products/images",
                "image"
            );

            uploadedImages.push(uploaded);
        }

        let uploadedVideo = null;

        if (videoFile) {
            uploadedVideo = await uploadToCloudinary(
                videoFile.buffer,
                "abeer-label/products/videos",
                "video"
            );
        }

        const product = await Product.create({
            ...req.body,

            sizes:
                typeof req.body.sizes === "string"
                    ? JSON.parse(req.body.sizes)
                    : req.body.sizes,

            seoKeywords:
                typeof req.body.seoKeywords === "string"
                    ? JSON.parse(req.body.seoKeywords)
                    : req.body.seoKeywords,

            images: uploadedImages,
            video: uploadedVideo,

            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// get all product
export const getProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            search,
            category,
            featured,
            status,
            sort,
        } = req.query;

        const query = {};

        if (search) {
            query.name = {
                $regex: search,
                $options: "i",
            };
        }

        if (category) {
            query.category = category;
        }

        if (featured === "true") {
            query.isFeatured = true;
        }

        if (status && status !== "all") {
            query.status = status;
        } else if (!status) {
            // Public-facing default: only published
            query.status = "published";
        }
        // if status === "all", no filter is applied (admin use)

        let sortOption = {
            createdAt: -1,
        };

        if (sort === "price_asc") {
            sortOption = { price: 1 };
        }

        if (sort === "price_desc") {
            sortOption = { price: -1 };
        }

        const products = await Product.find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Product.countDocuments(
            query
        );

        return res.status(200).json({
            success: true,

            data: products,

            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit),
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// gey product by id
export const getProductBySlug = async (
    req,
    res
) => {
    try {
        const product =
            await Product.findOne({
                slug: req.params.slug,
            });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// update product or edit
export const updateProduct = async (
    req,
    res
) => {
    try {
        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const imageFiles =
            req.files?.images || [];

        const videoFile =
            req.files?.video?.[0];

        if (imageFiles.length) {
            for (const image of product.images) {
                await deleteFromCloudinary(
                    image.publicId
                );
            }

            const uploadedImages = [];

            for (const file of imageFiles) {
                const uploaded =
                    await uploadToCloudinary(
                        file.buffer,
                        "abeer-label/products/images"
                    );

                uploadedImages.push(uploaded);
            }

            product.images = uploadedImages;
        }

        if (videoFile) {
            if (
                product.video?.publicId
            ) {
                await deleteFromCloudinary(
                    product.video.publicId,
                    "video"
                );
            }

            const uploadedVideo =
                await uploadToCloudinary(
                    videoFile.buffer,
                    "abeer-label/products/videos",
                    "video"
                );

            product.video = uploadedVideo;
        }

        if (req.body.sizes) {
            req.body.sizes =
                typeof req.body.sizes === "string"
                    ? JSON.parse(req.body.sizes)
                    : req.body.sizes;
        }

        if (req.body.seoKeywords) {
            req.body.seoKeywords =
                typeof req.body.seoKeywords === "string"
                    ? JSON.parse(req.body.seoKeywords)
                    : req.body.seoKeywords;
        }

        Object.keys(req.body).forEach(
            (key) => {
                product[key] = req.body[key];
            }
        );

        await product.save();

        return res.status(200).json({
            success: true,
            message:
                "Product updated successfully",
            data: product,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// delete the product
export const deleteProduct = async (
    req,
    res
) => {
    try {
        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        for (const image of product.images) {
            await deleteFromCloudinary(
                image.publicId
            );
        }

        if (
            product.video?.publicId
        ) {
            await deleteFromCloudinary(
                product.video.publicId,
                "video"
            );
        }

        await product.deleteOne();

        return res.status(200).json({
            success: true,
            message:
                "Product deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// update stock
export const updateStock = async (
    req,
    res
) => {
    try {
        const { stock } = req.body;

        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        product.stock = stock;
        product.inStock = stock > 0;

        await product.save();

        return res.status(200).json({
            success: true,
            message:
                "Stock updated successfully",
            data: product,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// update status
export const updateStatus = async (
    req,
    res
) => {
    try {
        const { status } = req.body;

        const product =
            await Product.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Status updated successfully",
            data: product,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};