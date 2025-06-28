const Section= require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req,res) => {
    try{
        //data fetch
        const{sectionName,courseId} = req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'Missing properties in creating section',
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section objectid
        const updatedCourseDetails = await Course.findByIdAndUpdate(
          courseId,
          {
            $push: {
              courseContent: newSection._id,
            },
          },
          { new: true }
        )
          //hw use populate to replace sections?subsections both in the updatedCourseDetails
          .populate({
            path: "courseContent", // Populate the courseContent field (sections)
            populate: {
              path: "subSections", // Populate the subSections field within each section
            },
          })
          .exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create section,please try again",
            error:error.message,
        })
    }
};

exports.updateSection = async (req,res) => {
    try{
        //data input
        const {sectionName,sectionId} = req.body;
        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing properties in updating section',
            })
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        //return response
        return res.status(200).json({
          success: true,
          message: "Section updated successfully",
          section,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update section,please try again',
            error:error.message,
        });
    }
};

exports.deleteSection = async(req,res) => {
    try{
        //get id assuming that we are sending ID in params
        const {sectionId} = req.body;

        //use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        //return response
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
        })
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to delete the section,please try again',
            error:error.message,
        });
    }
}
