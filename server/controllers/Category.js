const Category = require('../models/Category');
// create Tag handler function
exports.createCategory = async (req, res) => {
    try {
        // get data
        const {name, description} = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }

        // create entry in db
        const categoriesDetails = await Category.create({
            name: name,
            description: description,
        });

        return res.status(200).json({
            success: true,
            message: "Categories added!"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get all tags
exports.showAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}, {name: true, description: true});

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully!",
            categories
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// category based details
exports.categoryPageDetails = async (req, res) => {
    try {
        // get categories id
        const {categoryId} = req.body;
        // get courses for specified categoryID
        const selectedCategory = await Category.findById(categoryId).populate('courses').exec();
        // validation
        if (!selectedCategory) {
            return res.status(400).json({
                success: false,
                message: "Data not found!"
            });
        }
        // get courses for different catorgories
        const differentCategory = await Category.find(
            {
                _id: {$ne: categoryId}
            })
            .populate('courses')
            .exec();

        // HW: get top selling course

        // return reponse
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}