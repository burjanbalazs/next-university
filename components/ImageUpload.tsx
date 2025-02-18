"use client";

import config from "@/lib/config";
import ImageKit from "imagekit";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

async function authenticator() {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errortext = await response.text;
      throw new Error(
        `Request failed with status ${response.status}: ${errortext}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
}

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error)
    toast({
      title: "Image upload failed",
      description: `Your image couldn't be uploaded`,
      variant: 'destructive'
    })
  };

  const onSuccess = (res: any) => {
    setFile(res);
    console.log(res.filePath)
    onFileChange(res.filePath)
    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`
    })
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}>
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
      <button
        className="form-input upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}>
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}></IKImage>
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
