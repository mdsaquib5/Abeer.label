import { Readable } from "stream";
import cloudinary from "../configs/cloudinary.js";

export const uploadToCloudinary = (
    fileBuffer,
    folder,
    resourceType = "image"
) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) return reject(error);

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            }
        );

        Readable.from(fileBuffer).pipe(uploadStream);
    });
};

export const deleteFromCloudinary = async (
    publicId,
    resourceType = "image"
) => {
    return cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
    });
};