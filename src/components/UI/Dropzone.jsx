import { useDropzone } from "react-dropzone";
import Icon from "./Icons.jsx";
import "./Dropzone.scss";
import { Button } from "./Button.jsx";

export const Dropzone = ({ onDrop, selectedFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`dropzone${isDragActive || selectedFile ? " dropzone--active" : ""}`}
    >
      <input {...getInputProps()} />
      {selectedFile ? (
        <div className="selectedFile">
          <p>Selected file: {selectedFile.name}</p>
          <Button variant="darkDanger" onClick={() => onDrop([])}>
            <Icon.Cross />
          </Button>
        </div>
      ) : (
        <div className="uploadImg">
          <Icon.Upload />
          <p>Drop file here, or click to select a file</p>
        </div>
      )}
    </div>
  );
};
