const cloudinary = require("cloudinary").v2;
const File = require("../models/file");

// LocalFile Upload

exports.localFileUpload = async (req,res) => {
    try {
        // Fetching File
        const file = req.files.file;
        console.log("File Fetched Successfully",file);
        // Create Path Where File Is Going To Be Stored
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("PATH -> ",path);
        // App Path TO Move Function
        file.mv(path, (err) => {
            console.log(err);
        });
        // Response
        res.json({
            success:true,
            message:"Local File Upload Success",
        });
    }
    catch (error) {
        console.log(error);
    }
}

// Function Of Checking FileType

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

// Cloudinary File Upload

async function uploadFileToCloudinary(file,folder){
    const options = {folder};
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// Image Upload
exports.imageUpload = async (req,res) => {
    try{
        // Data Fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        // File Fetching 
        const file = req.files.imageFile;
        console.log(file);
        // Validation   
        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format Not Supported",
            })
        }

        const response = await uploadFileToCloudinary(file,"SampleFileUpload");
        console.log(response);
        // Saving Entry In DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success : true,
            message: "Image Uploaded SuccessFully",
        });
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong",
        });
    }
}

// For Video Upload

function isFileValid(type, size, supportedTypes, maxSizeMB) {
    const fileTypeValid = supportedTypes.includes(type);
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to Bytes
    const fileSizeValid = size <= maxSizeBytes;

    return fileTypeValid && fileSizeValid;
}

async function uploadVideoFileToCloudinary(file,folder){
    const options = {folder,resource_type: 'video'};
    // options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
exports.videoUpload = async (req,res) =>{
    try{
        // Data Fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        // File Fetching 
        const file = req.files.videoFile;
        console.log(file);
        // Validation   
        const supportedTypes = ["mp4" , "mov" ];
        const fileType = file.name.split(".")[1].toLowerCase();
        const fileSize = file.size; // Size in bytes
        const maxSizeMB = 5; // 5MB

        if (!isFileValid(fileType, fileSize, supportedTypes, maxSizeMB)) {
            let message = "File Format Not Supported";
            if (!supportedTypes.includes(fileType)) {
                message = "File Format Not Supported";
            } else if (fileSize > maxSizeMB * 1024 * 1024) {
                message = "File size exceeds the 5MB limit";
            }
            return res.status(400).json({
                success: false,
                message: message,
            });
        }


        const response = await uploadVideoFileToCloudinary(file,"SampleFileUpload");
        console.log(response);
        // Saving Entry In DB
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url
        })

        res.json({
            success : true,
            message: "Video Uploaded SuccessFully",
        });
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong",
        });
    }
}


// Cloudinary File Upload But By Reducing Size

async function uploadCompressedFileToCloudinary(file,folder,quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// Image Upload
exports.imageSizeReducer = async (req,res) => {
    try{
        // Data Fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        // File Fetching 
        const file = req.files.imageFile;
        console.log(file);
        // Validation   
        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format Not Supported",
            })
        }

        const response = await uploadCompressedFileToCloudinary(file,"SampleFileUpload",30);
        console.log(response);
        // Saving Entry In DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success : true,
            message: "Image Uploaded SuccessFully",
        });
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong",
        });
    }
}