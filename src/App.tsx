import { useState } from 'react'
import { pinata } from './utils/config';
import FileUploadComponent from './components/file-upload';
import { useData } from "@/store/data";

function App() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [attributes, setAttributes] = useState<{ trait_type: string; value: string }[]>([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const {ipfsHash} = useData();

  const addRow = () => {
    setAttributes([...attributes, { trait_type: "", value: "" }]);
  };

  const updateValue = (index: number, key: "trait_type" | "value", value: string) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][key] = value;
    setAttributes(updatedAttributes);
  };

  const deleteRow = (index: number) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
  };

  const generateJSON =async () => {
    if(ipfsHash){
      const jsonData = {
        attributes,
        description,
        image:`ipfs://${ipfsHash}/`,
        name, 
      };
  
      const jsonString = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      //////////////////////////////////////////////////////////
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = "data.json";
      // a.click();
      // URL.revokeObjectURL(url);
      ////////////////////////////////////////////////////////////
      const jsonFile = new File([blob], "metadata.json", { type: "application/json" });

      try {
        const upload = await pinata.upload.file(jsonFile);
        console.log("Uploaded JSON to Pinata:", upload);
        alert("JSON file uploaded to Pinata successfully!");
      } catch (error) {
        console.error("Error uploading JSON file to Pinata:", error);
        alert("Failed to upload JSON file to Pinata.");
      }
    }
   
  };

  // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedFile(event.target?.files?.[0]);
  // };

  // const handleSubmission = async () => {
  //   try {
  //     if (selectedFile)
  //   {  const upload = await pinata.upload.file(selectedFile)
  //     console.log(upload);}
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
      <div>
            {/* <label className="form-label"> Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button> */}

<div className="p-8 min-h-screen text-white">
  <FileUploadComponent/>
      <h1 className="text-2xl font-bold mb-4">Dynamic JSON Builder</h1>

      {/* Table */}
      <table className="w-full border rounded-lg overflow-hidden mb-4">
        <thead className="bg-gray-800">
          <tr>
            <th className="w-[5%] px-4 py-2 text-lg">#</th>
            <th className="w-[45%] px-4 py-2 text-lg">Trait Type</th>
            <th className="w-[45%] px-4 py-2 text-lg">Value</th>
            <th className="w-[5%] px-4 py-2 text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attribute, index) => (
            <tr key={index} className="hover:bg-gray-700 group">
              <td className="px-2 py-1 text-center">{index + 1}</td>
              <td className="px-2 py-1">
                <input
                  value={attribute.trait_type}
                  onChange={(e) => updateValue(index, "trait_type", e.target.value)}
                  placeholder="Enter Trait Type"
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
                />
              </td>
              <td className="px-2 py-1">
                <input
                  value={attribute.value}
                  onChange={(e) => updateValue(index, "value", e.target.value)}
                  placeholder="Enter Value"
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
                />
              </td>
              <td className="px-2 py-1 text-center">
                <button
                  onClick={() => deleteRow(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={addRow}
        className="px-4 py-2 text-white rounded-lg hover:bg-gray-700 transition-colors mb-4"
      >
        + Add New Trait
      </button>

      {/* Description and Image */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-2 focus:outline-none"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">Name of NFT</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter NFT Name"
          className="w-full text-white border border-gray-600 rounded-lg p-2 focus:outline-none"
        />
      </div>

      {/* Generate JSON */}
      <button
        onClick={generateJSON}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
      >
        Generate JSON
      </button>
    </div>
      </div>
    )
}

export default App
