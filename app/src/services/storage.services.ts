//import { Storage } from '@google-cloud/storage';

export interface StorageInterface {
    uploadFile: (bucketName: string, filePath: any, id: string) => void;
    downloadFile: (bucketName: string, id: string, filePath: any) => void; 
}

// Props interface for uploadFile function
type FileProps = {
    bucketName: string,
    filePath: string,
    id: string,
}
/**
 * Uploads a file to a bucket
 * @param {string} bucketName - The name of the bucket to upload the file to
 * @param {string} filePath - The local path to the file to upload 
 * @param {string} id - The id the file will be saved as in the bucket. Format: courseId/sectionsId/componentId/index or courseId/index
 * @returns {void}	
 */
async function uploadFile({bucketName, filePath, id}: FileProps) {
    //const {bucketStorage} = require('@google-cloud/storage');
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

/**
 * 
 * @param {string} bucketName - The name of the bucket to download the file from
 * @param {string} id - The id of the file to download
 * @param {string} filePath - The local path to save the file to
 * @returns {void} 
 */

function downloadFile({bucketName, id, filePath}: FileProps) {
   
    let test = fetch("https://storage.googleapis.com/educado-bucket/gorilla");
    
    console.log(test);
    
    /*console.log("downloadFile");
    const storage = new Storage();

    async function downloadByteRange() {
        const options = {
            destination: filePath,
        };
  
        console.log("downloading is starting");
        // Downloads the file from the starting byte to the ending byte specified in options
        await storage.bucket(bucketName).file(id).download(options);
        console.log("downloaded file to " + filePath);
    }
    downloadByteRange();
    // [END storage_download_byte_range]
    console.log("downloadFile done");*/
}
/* Fix this later
process.on('unhandledRejection', (err:any) => {
console.error(err.message);
process.exitCode = 1;
});
*/
const StorageServices = Object.freeze({
    uploadFile,
    downloadFile
});

export default StorageServices;