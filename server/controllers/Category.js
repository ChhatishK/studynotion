const Category = require('../models/Category');

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
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
            data: categories
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

        console.log("CATEGORY_ID: ", categoryId)

        // get courses for specified categoryID
        const selectedCategory = await Category.findById(categoryId).populate({
            path: "courses",
            match: {status: 'Published'},
            populate: "ratingAndReviews",
            populate: "instructor"
        }).exec();

        // no course found for selected category
        if (selectedCategory.courses.length === 0) {
            console.log("No course found for selected category");
            return res.status(404).json({
                success: false,
                message: "No Course found for selected category."
            })
        }

        // course except selected category
        const CategoryExceptSelected = await Category.find({
            _id: {$ne: categoryId}
        });

        // get courses for different catorgories
        const differentCategory = await Category.findOne(
            CategoryExceptSelected[getRandomInt(CategoryExceptSelected.length)]._id)
            .populate({
                path: 'courses',
                match: {status: 'Published'}
            })
            .exec();


        // all categories
        const allCategories = await Category.find({}).populate({
            path: 'courses',
            match: {status: "Published"},
            populate: {
                path: "instructor"
            }
        })

        //get top selling course
        const allCourses = allCategories.flatMap((category) => category.courses)

        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);

        // return reponse
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Internal Server Error",
            error: error.message,
        })
    }
}