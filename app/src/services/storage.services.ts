import AWS from "aws-sdk";

// AWS configuration update
AWS.config.update({
    accessKeyId: import.meta.env.VITE_S3_ACCESS,
    secretAccessKey: import.meta.env.VITE_S3_SECRET
});


const myBucket = new AWS.S3({
    params: { Bucket: import.meta.env.VITE_S3_BUCKET },
    region: import.meta.env.VITE_S3_REGION
});

// Props interface
// Delete later
type FileUploadProps1 = {
    file: any,
    key: string // The key should be a the content plus the exercise id
}

//id/coverImg

// Upload image file to storage bucket
// Delete later
const uploadFile1 = async ({ file, key }: FileUploadProps) => {
    await myBucket.putObject({
        Body: file,
        Bucket: import.meta.env.VITE_S3_BUCKET,
        Key: key, 
        ContentType: file.type
    }).send();

    return key;
};

const StorageService = Object.freeze({ uploadFile });

// Props interface for uploadFile function
type FileUploadProps = {
    bucketName: string,
    filePath: any,
    id: string,
}
/**
 * Uploads a file to a bucket
 * @param {string} bucketName - The name of the bucket to upload the file to
 * @param {string} filePath - The local path to the file to upload 
 * @param {string} id - The id the file will be saved as in the bucket. Format: courseId/sectionsId/componentId/index or courseId/index
 * @returns {void}	
 */
async function uploadFile({bucketName, filePath, id}: FileUploadProps) {
    // Imports the Google Cloud client library
    const {Storage} = require('@google-cloud/storage');
    const storage = new Storage();
    
    // Uploads a local file to the bucket with the id as the name of the file in the bucket 
    async function uploadFile(){
        const options = {
            destination: id,
        };
        // Uploads a local file to the bucket
        await storage.bucket(bucketName).upload(filePath, options);
        //debuging 
        console.log(`${filePath} uploaded to ${bucketName}`);
    }
    //catch errors and log them
    uploadFile().catch(console.error);
}
export default StorageService;