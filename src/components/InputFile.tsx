"use client";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Box, TextField } from "@mui/material";

export function InputFile() {
  const [file, setFile] = useState<string>("");
  const [openAIResponce, setopenAIResponce] = useState<string>("");

  let fileExtension = "";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      window.alert("No file selected. Choose a file.");
    } else {
      const file = event.target.files[0];
      fileExtension = file.name.split(".").reverse()[0]; // get file extension

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === "string") {
          console.log(reader.result);
          setFile(reader.result);
        }
      };

      reader.onerror = (error) => {
        console.log("error: " + error);
      };
    }
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        variant="outlined"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)}
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
      />
      {file !== "" ? (
        <Box my={2}>
          <object data={file} width="100%" height="auto"></object>
          {fileExtension !== "pdf" ?? (
            <Image
              src={file}
              alt="File preview"
              width={0}
              height={0}
              style={{
                width: "100%",
                height: "auto",
              }}
              fill
            />
          )}
        </Box>
      ) : (
        <div>
          <p>Once you upload a file, you will see it here</p>
        </div>
      )}
    </>
  );
}
