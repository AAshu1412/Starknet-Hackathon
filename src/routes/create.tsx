import React, { useRef, useState } from "react";
import { pinata } from "@/utils/config";
import { useData } from "@/store/data";

const NFTUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [attributes, setAttributes] = useState<
    { trait_type: string; value: string }[]
  >([]);
  const { setIpfsHash } = useData();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
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

  const addRow = () => {
    setAttributes([...attributes, { trait_type: "", value: "" }]);
  };

  const updateValue = (
    index: number,
    key: "trait_type" | "value",
    value: string
  ) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][key] = value;
    setAttributes(updatedAttributes);
  };

  const deleteRow = (index: number) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
  };

  const generateJSON = () => {
    const jsonData = {
      attributes,
      description,
      image,
      name, 
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "metadata.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#42007a] to-[#7f20ff] text-white">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Upload NFT</h1>
        <div className="relative">
          <button className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
            Profile
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-700">
              Go to Profile
            </a>
            <button className="block px-4 py-2 w-full text-left hover:bg-gray-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Upload File</h2>
          <div className="border-2 border-dashed border-white rounded-lg p-8">
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
                  <span className="text-sm">PNG, JPEG, JPG Max 99KB</span>
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

          <h2 className="text-2xl font-bold">Traits</h2>
          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Trait Type</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attribute, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <input
                      value={attribute.trait_type}
                      onChange={(e) =>
                        updateValue(index, "trait_type", e.target.value)
                      }
                      placeholder="Enter Trait Type"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      value={attribute.value}
                      onChange={(e) =>
                        updateValue(index, "value", e.target.value)
                      }
                      placeholder="Enter Value"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteRow(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addRow}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            + Add New Trait
          </button>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Preview</h2>
          <div className="border border-white rounded-lg p-4 h-64 flex items-center justify-center">
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

          <div className="space-y-4">
            <label className="block font-medium">Enter NFT Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter NFT Name"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4"
            />
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4"
              rows={4}
            />
            <label className="block font-medium">Image Link</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image link"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4"
            />
            <label className="block font-medium">Image Link</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image link"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4"
            />
          </div>
          <button
            onClick={generateJSON}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
          >
            Generate Metadata JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTUploadPage;
