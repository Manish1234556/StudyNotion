const Course= require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


//createcourse
exports.createCourse = async(req,res) => {
    try{

        const userId = req.user.id;
        //fetch data
        let {
          courseName,
          courseDescription,
          whatYouWillLearn,
          price,
        //   tag,
          category,
          status,
          instructions,
        } = req.body;

        //get thumbnail
        // const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || 
           !courseDescription || 
           !whatYouWillLearn || 
           !price || 
        //    !tag || 
        //    !thumbnail ||
           !category){
            return res.status(400).json({
                success:false,
                message:'All fields are required to be filled',
            });
        }
        if (!status || status === undefined) {
          status = "Draft";
        }
        //check for instructor
        const instructorDetails = await User.findById(userId, {
          accountType: "Instructor",
        });
        console.log("Instructor Details: ", instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }

        //check category is valid
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
          return res.status(404).json({
            success: false,
            message: "Category Details Not Found",
          });
        }

        //upload image to cloudinary
        
        // const thumbnailImage = await uploadImageToCloudinary(
        //   thumbnail,
        //   process.env.FOLDER_NAME
        // );
        // console.log(thumbnailImage);
        
        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            //tag,
            //thumbnail:thumbnailImage.secure_url,
            category: categoryDetails._id,
        })

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push: {
                    courses:newCourse._id,
                }
            },
            {new:true},
        );

        //update the TAG ka schema
        //TODO: HW

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created suceessfully",
            data:newCourse,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create course',
            error:error.message,
        })
    }
}

//get all courses
exports.getAllCourses = async (req,res) => {
    try{
        const allCourses = await Course.find({},{courseName:true,price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }).populate("instructor")
        .exec();

        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:allCourses,
        })
    }

    catch(error){
        console.log(error);
        return res.status(404).json({
            success:false,
            message:'Error in fetching all course data',
            error:error.message,
        })
    }
};

//get course details
exports.getCourseDetails = async (req,res) => {
    try{
        //get id
        const {courseId} = req.body;
        //find course detail 
        const courseDetails = await Course.find({ _id: courseId })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          // .populate("ratingAndReview")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSections",
            },
          })
          .exec();

            //validation
            if(!courseDetails) {
                return res.status(400).json({
                    success:false,
                    message:`Could Not find the course with ${courseId}`,
                });
            }
            //return response
            return res.status(200).json({
              success: true,
              message: "Course details fetched successfully",
              data: courseDetails,
            });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}