const Category= require("../models/Category");

//handler function of create tag
exports.createCategory = async (req,res) => {
    try{
        //fetch data
        const {name,description} = req.body;
         
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required to be filled',
            })
        }

        //create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);

        //return response
        return res.status(200).json({
          success: true,
          message: "Category Created Successfully",
          category: categoryDetails,
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

//get allTags
exports.showAllCategory = async (req,res) => {
    try{
        const allCategory = await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All Category returned successfully",
            allCategory,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

//category page details
exports.categoryPageDetails = async (req,res) => {
    try{
        //get category id
        const {categoryId} = req.body;
        //get courses for specified category id
        const selectedCategory = await Category.findById(categoryId)
                                     .populate("courses")
                                     .exec()
        //validation 
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:'Data Not found'
            });
        }
        //get courses for different categories
        const differentCategories = await Category.find({
                                     _id:{$ne: categoryId},
                                    })
                                    .populate("courses")
                                    .exec();
        //hw -get top selling courses
        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            },
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};