import axios from "axios";
const backend_route = import.meta.env.VITE_BACKEND_URL;


//import { Storage } from '@google-cloud/storage';


export interface StorageInterface {
    uploadFile: (bucketName: string, filePath: any, id: string) => void;
    downloadFile: (bucketName: string, id: string, filePath: any) => void; 
}

// Props interface for uploadFile function
type FileProps = {
    filePath: any,
    id: string,
}
/**n
 * Uploads a file to a bucket
 * @param {string} filePath - The local path to the file to upload 
 * @param {string} id - The id the file will be saved as in the bucket. Format: courseId/sectionsId/componentId/index or courseId/index
 * @returns {void}	
 */
async function uploadFile({filePath, id}: FileProps) {
    axios.postForm(`${backend_route}/upload`, {
        fileName: id,
        file: filePath
    })



}


const StorageServices = Object.freeze({
    uploadFile
});

export default StorageServices;