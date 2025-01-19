import React, { useRef, useState } from "react";
import { pinata } from "../utils/config";
import { useData } from "../store/data";

const FileUploadComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const {setIpfsHash} = useData();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmission = async () => {
    try {
      if (selectedFile) {
        const upload = await pinata.upload.file(selectedFile);
        setIpfsHash(upload.IpfsHash);
        console.log("Upload successful:", upload);
      } else {
        console.log("No file selected");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 border-b border-gray-600/50 pb-5">
      {/* Upload Section */}
      <div className="space-y-4 flex-1">
        <h2 className="text-2xl font-bold text-[#FFFFFF]">Upload File</h2>
        <div className="border-2 border-dashed border-[#FFFFFF] rounded-lg p-8">
          <div className="text-center space-y-4">
            <input
              type="file"
              onChange={changeHandler}
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-4">
                <span className="text-sm">PNG, JPEG, JPG Max 99KB.</span>
                <button
                  onClick={handleButtonClick}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Choose File
                </button>
              </div>
            </label>
            {selectedFile && (
              <p className="text-sm mt-2">Selected: {selectedFile.name}</p>
            )}
            <button
              onClick={handleSubmission}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
            >
              Upload File
            </button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-4 flex-1">
        <h2 className="text-2xl font-bold text-[#FFFFFF]">Preview</h2>
        <div className="border border-[#FFFFFF] rounded-lg p-4 h-64 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <p className="text-sm text-gray-400 text-center">
              Upload file to preview your content
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;