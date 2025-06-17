const mongoose = require('mongoose')
const Product = require('../models/product')
const productValidation = require('../validation/productValidation')
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const getAllProducts = async (req, res) => {
    try {

        let { search, category, minPrice, maxPrice, page = 1, limit = 5 } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { pname: { $regex: search, $options: "i" } },
                { pdescription: { $regex: search, $options: "i" } }
            ];
        }

        if (category) {
            query.pcategory = category;
        }

        if (minPrice || maxPrice) {
            query.pprice = {};
            if (minPrice) query.pprice.$gte = Number(minPrice);
            if (maxPrice) query.pprice.$lte = Number(maxPrice);
        }

        page = Number(page);
        limit = Number(limit);
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            products
        });


    } catch (error) {
        console.error("Error fetching products:", error);
        res.sttaus(500).json({ message: 'server Error...!!!' })
    }
}

const createProduct = async (req, res) => {
    try {
        let isAdmin = req.user.isAdmin;

        if (!isAdmin) {
            return res.status(403).json({ error: 'only admins can add the products....!!!!' })
        }

        const { error } = productValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Product image is required' })
        }

        const product = new Product({
            pname: req.body.pname,
            pimage: {
                url: req.file.path,
                public_id: req.file.filename
            },
            pcategory: req.body.pcategory,
            pdescription: req.body.pdescription,
            pprice: req.body.pprice,
            pstock: req.body.pstock
        });

        await product.save();

        res.status(200).json({ message: 'Product added successfully..!!!' })

    } catch (error) {
        console.error("Error in product upload", error)
        res.status(500).json({ error: 'server error..!!!' })
    }
}

const getProductById = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(403).json({ message: " Invalid Product id...!!!" })
        }

        let existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({ message: "Product does not exist...!!!" })
        }


        res.status(200).json({ message: "product fetched successfully..!!", existingProduct });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "server error...!!!" })
    }
}

const updateProduct = async (req, res) => {
    try {
        let isAdmin = req.user.isAdmin;

        if (!isAdmin) {
            return res.status(403).json({ error: 'only admins can add the products....!!!!' })
        }
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(403).json({ message: " Invalid Product id...!!!" })
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404   ).json({ message: 'product does not exist' })
        }

        if (product.pimage && product.pimage.public_id) {
            await cloudinary.uploader.destroy(product.pimage.public_id);
        }

        if (req.file) {
            req.body.pimage = {
                url: req.file.path,
                public_id: req.file.filename
            };
        } else {
            return res.status(400).json({ error: 'product image is required' })
        }

        const { error } = productValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({ message: "Product Updated Successfully.", product: updateProduct })

    } catch (error) {
        console.log("error updating the product:",error)
        res.status(500).json({ message: "server error...!!!" })
    }
}


const deleteProduct=async(req,res)=>{
    try{

         let isAdmin = req.user.isAdmin;

        if (!isAdmin) {
            return res.status(403).json({ error: 'only admins can add the products....!!!!' })
        }
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(403).json({ message: " Invalid Product id...!!!" })
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404   ).json({ message: 'product does not exist' })
        }
        

        await cloudinary.uploader.destroy(product.pimage.public_id);

        let deleteProduct=await Product.findByIdAndDelete(id);

        res.status(200).json({message:"product deleted successfully..!!!", deleteProduct})

    }catch(error) {
        console.log("error delete:",error)
        res.status(500).json({ message: "server error...!!!" })
  
    }
}
module.exports = { getAllProducts, createProduct, getProductById, updateProduct ,deleteProduct};