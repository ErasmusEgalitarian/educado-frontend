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
   
    let test = fetch("https://storage.googleapis.com/storage/v1/b/educado-bucket/o/gorilla?alt=media", {
        headers: {
          authorization: "Bearer -----BEGIN CERTIFICATE-----\+gAwIBAgIJAND4bIHLtP7BMA0GCSqGSIb3DQEBBQUAMDYxNDAyBgNV\nBAMMK2ZlZGVyYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20w\nHhcNMjMwOTI1MDQzNzU5WhcNMjMxMDExMTY1MjU5WjA2MTQwMgYDVQQDDCtmZWRl\ncmF0ZWQtc2lnbm9uLnN5c3RlbS5nc2VydmljZWFjY291bnQuY29tMIIBIjANBgkq\nhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtrD9XzkQVbaVs5NeV+PrHMYGm9JsfXKK\noPJWuU8zcA5T7sp25j4KvJAPgSdFO1x6AiVtxwKGUBnsr9gnNaiSM3qs/1/iJT09\nE/iqHUyaTiqf4wkEHA5ABinBkORsjQzZajsbbhtkv4Yw4vF44g2WhchdjLThpBB9\n6px+RV4C0ZK8beA+4cNEYhybYBsEjYDZLWAIKxtt+ZNc01AhM1p5nIDLp6Z05hAJ\nBVazj7Ac3JT/CwgYlY3MvLZSJIQjOZwBRLNl9wJhewiNvfIH3ijbPVKzLEyt5toN\nqsSyuBZtLr+z4UKv2gsoKFSU+KdkRBnO3ZtqVYIsiZ+09IEN1pL33QIDAQABozgw\nNjAMBgNVHRMBAf8EAjAAMA4GA1UdDwEB/wQEAwIHgDAWBgNVHSUBAf8EDDAKBggr\nBgEFBQcDAjANBgkqhkiG9w0BAQUFAAOCAQEAdL2D4ZVRxBt2TohXV+JpDFFZ92xH\nQH0OJ0bhbrfCc6AGBXx13IiLUwHok4jNZ0x+ZXQyDR9rKOdo5iTn4kQKD2blor5m\nj4r8aK/nXIxU7foxK0H7dJMALMdslAl5L3LKrE5beNLk/v2kfQM0pTqzeGaqTzNg\n3ZSHPQgJ/i8ES8+7dV12A+ct4nv3DT1M6rmCa6+AowlzpIllBlOkIe45qamPfY4j\niyNlfOlKA+r7JE/vXQeMHTucNSBzHlEL48wbo4nS4ftnEoI/9E/ryXZ4zp9YVDnU\nXQ2jfVgymwzNjPSoFJa+BAJOsx3Ig3Hor322OSXgNF3sIAb1xu4598k08g==\n-----END CERTIFICATE-----\n"
        }
    });
    
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