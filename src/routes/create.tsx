import { useRef, useState } from "react";
import { pinata } from "@/utils/config";
import { useData } from "@/store/data";
import { DragEvent, ChangeEvent } from "react";
import {
  ImageIcon,
  Upload,
  X,
  Plus,
  // ChevronDown,
  // LogOut,
  // User,
  // ExternalLink,
} from "lucide-react";

export default function UploadPage() {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState("");
  const [attributes, setAttributes] = useState<
    { trait_type: string; value: string }[]
  >([]);
  const { setIpfsHash } = useData();
  const [ipfsHash, setIpfsHashState] = useState<string>("");

  const handleSubmission = async () => {
    try {
      if (selectedFile) {
        const upload = await pinata.upload.file(selectedFile);
        setIpfsHash(upload.IpfsHash);
        setIpfsHashState(upload.IpfsHash);
        console.log("Upload successful:", upload);

        // Generate JSON after successful upload, using the hash directly
        const jsonData = {
          attributes,
          description,
          image: `ipfs://${ipfsHash}/`,
          name,
        };

        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const jsonFile = new File([blob], "metadata.json", {
          type: "application/json",
        });

        try {
          const jsonUpload = await pinata.upload.file(jsonFile);
          console.log("Uploaded JSON to Pinata:", jsonUpload);
          alert("JSON file uploaded to Pinata successfully!");
        } catch (error) {
          console.error("Error uploading JSON file to Pinata:", error);
          alert("Failed to upload JSON file to Pinata.");
        }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#42007a] to-[#7f20ff] p-4 md:p-6">
      {/* Header */}
      {/* <header className="max-w-7xl mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Blazy</h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDown
              size={16}
              className={`text-white transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 overflow-hidden">
              <div className="p-2 space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">
                  <ExternalLink size={16} />
                  <span>View on Explorer</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-pink-500 hover:bg-white/10 transition-colors">
                  <LogOut size={16} />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Upload NFT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Form */}
          <div className="space-y-6">
            {/* File Upload Area */}
            <div
              className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                isDragging
                  ? "border-white bg-white/20"
                  : "border-white/40 hover:border-white/60 bg-white/10"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                accept="image/*"
                className="hidden"
              />
              <Upload className="w-12 h-12 mx-auto mb-4 text-white/60" />
              <p className="text-white/80 mb-2">
                Drag and drop your file here or click to upload
              </p>
              <p className="text-sm text-white/60">
                Supported formats: JPG, PNG, GIF (max 10MB)
              </p>
              {selectedFile && (
                <div className="mt-4 flex items-center justify-center gap-2 text-white/80">
                  <ImageIcon size={16} />
                  <span>{selectedFile.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      // setImage("");
                    }}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-white/80 font-medium">Name</label>
              <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-16 rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                placeholder="Name your NFT..."
              />
              <label className="block text-white/80 font-medium">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-36 rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                placeholder="Describe your NFT..."
              />
            </div>

            {/* Traits */}
            <div className="space-y-4">
              <label className="block text-white/80 font-medium">Traits</label>
              <div className="space-y-3">
                {attributes.map((trait, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="text"
                      value={trait.trait_type}
                      onChange={(e) =>
                        updateValue(idx, "trait_type", e.target.value)
                      }
                      placeholder="Trait type"
                      className="flex-1 rounded-lg bg-white/10 border border-white/20 p-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                    />
                    <input
                      type="text"
                      value={trait.value}
                      onChange={(e) =>
                        updateValue(idx, "value", e.target.value)
                      }
                      placeholder="Value"
                      className="flex-1 rounded-lg bg-white/10 border border-white/20 p-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                    />
                    <button
                      onClick={() => deleteRow(idx)}
                      className="p-2 text-pink-500 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addRow}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Plus size={16} />
                  Add Trait
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white/10 p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Preview</h3>
              <div className="aspect-square rounded-xl overflow-hidden bg-white/5 relative group">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/40">
                    Upload file to preview your content
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-white/80 text-sm">Name</label>
                <h2 className="w-full rounded-lg bg-white/10 text-2xl p-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors">
                  {name}
                </h2>
                <p className="text-sm text-white/40">Description</p>
                <h3 className="w-full rounded-lg bg-white/10 text-md p-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors">
                  {description}
                </h3>
              </div>
            </div>

            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#42007a] to-[#7f20ff] hover:from-[#4b0088] hover:to-[#8c37ff] text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleSubmission}
            >
              Create NFT
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
