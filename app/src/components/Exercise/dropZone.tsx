import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import StorageService from '../../services/storage.services';

// TODO: Add file type to global interfaces?
// (I assume there is a reason we aren't using a built-in interface?)
/**
 * Interface for file object
 * @param name Name of the file
 * @param path Path to the file in the storage bucket
 * @param size Size of the file in bytes
 * @param type Type of the file
 */
interface BucketFile {
    name: string;
    path: string;
    size: number;
    type: string;
}

/**
 * Interface for props
 * @param updateFile Function to update the file in the parent component
 * @param storageKey Key to store the file in the storage bucket
 */
interface Props {
    updateFile: (file: BucketFile) => void;
    storageKey: string;
}

function DropZoneComponent({ updateFile, storageKey }: Props) {
    const [file, setFile] = useState<BucketFile | null>(null);

    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles);
        setFile(acceptedFiles[0]);
        setTimeout(() => handleFileUpload(acceptedFiles[0]), 300)
    }, []);

    const handleFileUpload = async (file: any) => {
        if (!file) {
            alert("Please select a file")
            return
        }

        try {
            await StorageService.uploadFile({ file, key: storageKey })
            // Send file up to parent exercise component for saving
            updateFile({
                name: file.name,
                path: storageKey,
                size: file.size,
                type: file.type,
            })

            alert("File uploaded successfully")

        } catch (error) {
            console.log(error);
            alert("File upload failed");
        }
    }


    const {
        getRootProps,
        getInputProps,
        isDragReject,
        isDragAccept,
    } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'video/mp4': []
        }
    });

    return (
        <div className="py-2 " >
            <div

                {...getRootProps()}
                className="rounded-md cursor-pointer focus:outline-none bg-base-100 hover:shadow-xl " >
                <input {...getInputProps()} />


                <div
                    className={
                        "flex flex-col items-center justify-center border-4 border-dashed p-4 rounded space-y-2" +
                        (isDragReject === true ? "border-red-500" : " ") +
                        (isDragAccept === true ? "border-green-500" : " ")

                    }
                >
                    <svg className="h-16 w-16 text-base-300" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />  <polyline points="9 15 12 12 15 15" />  <line x1="12" y1="12" x2="12" y2="21" /></svg>

                    {isDragReject ? (
                        <p> Unfortunatly, this applications does only support video files </p>
                    ) : (
                        <div className='flex flex-col items-center space-y-2'>
                            <h2 className='text-lg text-blue-500'>Drag and drop Files Here to Upload</h2>
                            <p className="text-base text-gray-500">{file ? file.name : "Please select a file"}</p>
                            <p className="text-sm text-gray-300">Only video files supported</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        //     {/* <button onClick={() => handleFileUpload(File)}> Upload</button>
        //  */}

    );
};

export default DropZoneComponent;