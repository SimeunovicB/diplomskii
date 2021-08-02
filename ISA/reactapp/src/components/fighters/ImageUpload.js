import { useState } from "react";
// import { handleInputChange } from 'react-select/src/utils';

function ImageUpload(props) {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = (event) => {
    const selectFile = event.target.files[0];
    setFile(selectFile);
    console.log("slika", selectFile);
    const filePreview = URL.createObjectURL(event.target.files[0]);
    setPreview(filePreview);
    props.onAddImage(selectFile);
  };


  return (
    <div>
        {file && <img src={preview} alt={file.name} style={{ width: "200px" }} />}
        <input type="file" name="file" onChange={handleChange} />
    </div>
  );
}

export default ImageUpload;
