import React from "react";
import { useDropzone } from "react-dropzone";
import Icon from "./Icons.jsx";
import "./Dropzone.scss";

export const Dropzone = ({ onDrop, selectedFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`dropzone${isDragActive || selectedFile ? " dropzone--active" : ""}`}
    >
      <input {...getInputProps()} />
      {selectedFile ? (
        <p>Selected file: {selectedFile.name}</p>
      ) : (
        <>
          <Icon.Upload />
          <p>Drop file here, or click to select a file</p>
        </>
      )}
    </div>
  );
};
