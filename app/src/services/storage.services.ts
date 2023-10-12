import axios from 'axios'

// import { Storage } from '@google-cloud/storage';

// Creates a client from a Google service account key.
export interface StorageInterface {
  uploadFile: (bucketName: string, filePath: any, id: string) => void
  downloadFile: (bucketName: string, id: string, filePath: any) => void
}

// Props interface for uploadFile function
interface FileProps {
  bucketName: string
  filePath: string
  id: string
}
/** n
 * Uploads a file to a bucket
 * @param {string} bucketName - The name of the bucket to upload the file to
 * @param {string} filePath - The local path to the file to upload
 * @param {string} id - The id the file will be saved as in the bucket. Format: courseId/sectionsId/componentId/index or courseId/index
 * @returns {void}
 */
async function uploadFile ({ bucketName, filePath, id }: FileProps) {
  return await axios.put(`https://storage.googleapis.com/${bucketName}/${id}`, {
    body: filePath,
    headers: {
      // authorization: `Bearer ${"-----BEGIN CERTIFICATE-----\nMIIC/DCCAeSgAwIBAgIIc58ZbfOHMD0wDQYJKoZIhvcNAQEFBQAwIDEeMBwGA1UE\nAxMVMTE0MzUyMzQwMDMxOTQ0OTY0Mjg2MCAXDTIzMDkyMDA5NDI0MloYDzk5OTkx\nMjMxMjM1OTU5WjAgMR4wHAYDVQQDExUxMTQzNTIzNDAwMzE5NDQ5NjQyODYwggEi\nMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWXm/KOvOp9WcT6HX1cQ8mnkv3\nZgrlHwqibTdri4Ge+w5rzlm6thGqvuols40ND28D8iFj1wyLyEmBNkBNPlOmuR+3\ngcuHTjfqV6Dl4pUp9UXSBm76YsZ0wHSyGFWbd8ujXljTEdVSFxI+eg2u4sRj8Ukf\nym0xtiITfXy/7D2luarUrQ6/zD5RG8oTspObg5NyRWVutqVEqqq5R8nNwhtI3KQf\ny8brm80VxvfuYz6Epv5lhN3lQFaaUaecHQhb6R+B0UKHEjtmhc+DxzoSFHoG6rNu\n4kZF0SolM3GfspwAzBgCvdGXzZsxtlX2YPzG+zNWLx9vyZ3cwfSEkPrvdUX/AgMB\nAAGjODA2MAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQM\nMAoGCCsGAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQAnbmkssgdtNHsi7Uu+Ks4R\nb9CllqEJwbEAEQWHfMjBRo9uh6F8WLy91aKoRGPZgqhh9++r9kHZYKcheAKE9z8d\no7MFH6tqjikAisu6rjowxpyv8TfJ7T71hOQBKGGNAfg2bWtMkGmac/QvrbtaPV47\nw3V0Xjm7wKLKEqiEmPhdrPE7EOStlKyfi/q8xK73tCLKnwo4O5SsRTIpiZYnUdYI\nU6hwzeW7+zUIfgketc/aZlspXBw+rvZ2R5GR000++mSbZW4ylNxbfp8d64kmwstR\nKXqLcEyqO+0n3secK5O0yoVFPJxFqgX8eYJTSPaQAqcuSzV+LvRGy5Tcp0fQC8HP\n-----END CERTIFICATE-----\n"}`,
      'Content-Type': 'image/png'
    },
    method: 'PUT'
  })

  /*
    fetch(`https://storage.googleapis.com/${bucketName}/${id}`, {
        body: filePath,
        headers: {
            "Content-Type": "image/png"
        },
        method: "PUT"
    })
    */
}

/**
 *
 * @param {string} bucketName - The name of the bucket to download the file from
 * @param {string} id - The id of the file to download
 * @param {string} filePath - The local path to save the file to
 * @returns {void}
 */
/*
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
    console.log("downloadFile done"); */

/* Fix this later
process.on('unhandledRejection', (err:any) => {
console.error(err.message);
process.exitCode = 1;
});
*/

// export default StorageServices;
const StorageServices = Object.freeze({
  uploadFile
})

export default StorageServices
