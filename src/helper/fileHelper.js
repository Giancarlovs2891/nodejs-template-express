const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');

const internals = {
    AWS_CONFIG: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION
    }
}

module.exports.storeWithOriginalName = (file) => {  
    const filename = `${file.filename}_${file.originalname}`
    const fullNewPath = path.join(file.destination, filename)
    fs.renameSync(file.path, fullNewPath);
    return {
        filename,
        path: fullNewPath,
        type: file.mimetype
    };
}

module.exports.uploadToS3 = async ({ filename, path, type }) => {
    try {
        AWS.config.update(internals.AWS_CONFIG);
        const s3 = new AWS.S3({
            httpOptions: {
                timeout: 9000000
            }
        });
        const fileBuffer = new Buffer(fs.readFileSync(path));
        const s3File = await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
            Body: fileBuffer,
            ContentType: type,
            ACL: 'public-read'
        }).promise();
        return s3File;
    } catch (error) {
        throw new Error(error);
    }
}