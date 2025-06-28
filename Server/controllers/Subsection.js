const SubSection= require("../models/SubSection"); 
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
//create subsection

exports.createSubSection = async (req,res) => {
    try{
      //fetch data from req body
      const { sectionId, title, timeDuration, description } = req.body;
      //extract file/video
      const video = req.files.videoFile;
      //validation
      if (!sectionId || !title || !timeDuration || !description || !video) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      //upload video to cloudinary
      const uploadDetails = await uploadImageToCloudinary(video);
      //fetch secure url
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: timeDuration,
        description: description,
        videoUrl: uploadDetails.secure_url,
      });
      //update section by this subsection objectid
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $push: {
            subSections: SubSectionDetails._id,
          },
        },
        { new: true }
      )
        .populate("subSections")
        .exec();
      //hw log updated section here,after populate query
      return res.status(200).json({
        success:true,
        message:'Sub Section Created successfuly',
        updatedSection,
      })
    }

    
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to create subsection', 
        })
    }
}
 
//hw update subsection
exports.updateSubSection = async (req, res) => {
  try {
    // Fetch data from req body
    const { subSectionId, title, timeDuration, description, video } = req.body;
    // Validation
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID is required",
      });
    }
    // Prepare update object
    const updateData = {};
    if (title) updateData.title = title;
    if (timeDuration) updateData.timeDuration = timeDuration;
    if (description) updateData.description = description;
    if (video) {
      const uploadDetails = await uploadImageToCloudinary(req.files.videoFile);
      updateData.videoUrl = uploadDetails.secure_url;
    }
    // Update subsection
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      updateData,
      { new: true }
    );
    if (!updatedSubSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }
    // Return response
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      updatedSubSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update subsection",
      error: error.message,
    });
  }
};

//delete subsection
exports.deleteSubSection = async (req, res) => {
  try {
    // Fetch subsection ID from req body
    const { subSectionId, sectionId } = req.body;
    // Validation
    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID and Section ID are required",
      });
    }
    // Delete subsection
    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);
    if (!deletedSubSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }
    // Remove subsection reference from section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSections: subSectionId,
        },
      },
      { new: true }
    )
      .populate("subSections")
      .exec();
    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }
    // Return response
    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete subsection",
      error: error.message,
    });
  }
};