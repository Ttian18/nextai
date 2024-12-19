import React from "react";
import axios from "axios"; // Import axios for HTTP requests
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const DOMAIN = "http://localhost:5001";

const uploadToBackend = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(`${DOMAIN}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading file: ", error);
    return null;
  }
};

const attributes = {
  name: "file",
  multiple: true,
  customRequest: async ({ file, onSuccess, onError }) => {
    const response = await uploadToBackend(file);
    if (response && response.status === 200) {
      // Handle success
      onSuccess(response.data);
    } else {
      // Handle error
      onError(new Error("Upload failed"));
    }
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const PdfUploader = () => {
  return (
    <Dragger {...attributes}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default PdfUploader;