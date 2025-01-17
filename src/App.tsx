import { useState } from 'react'
import { pinata } from './utils/config';

function App() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [attributes, setAttributes] = useState<{ trait_type: string; value: string }[]>([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

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

  const generateJSON = () => {
    const jsonData = {
      attributes,
      description,
      image,
      name: "Pudgy Penguin #880", // Static for this example, can be dynamic if needed
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target?.files?.[0]);
  };

  const handleSubmission = async () => {
    try {
      if (selectedFile)
    {  const upload = await pinata.upload.file(selectedFile)
      console.log(upload);}
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div>
            {/* <label className="form-label"> Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button> */}

<div className="p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dynamic JSON Builder</h1>

      {/* Table */}
      <table className="w-full border rounded-lg overflow-hidden mb-4">
        <thead className="">
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
          className="w-full border border-gray-600 rounded-lg p-2 focus:outline-none"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium">Image Link</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image link"
          className="w-full border border-gray-600 rounded-lg p-2 focus:outline-none"
        />
      </div>

      {/* Generate JSON */}
      <button
        onClick={generateJSON}
        className="px-6 py-2 rounded-lg hover:bg-green-500 transition-colors"
      >
        Generate JSON
      </button>
    </div>
      </div>
    )
}

export default App
