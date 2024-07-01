import React, { ChangeEvent, useState, MouseEvent } from "react";
import { Box, styled, MenuItem, Menu, Button } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

// Define the type for the fetchFile function
interface FetchFileProps {
  fetchFile: (file: { filename: string; base64: string }) => void;
}

const Clip: React.FC<FetchFileProps> = ({ fetchFile }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fileBase64, setFileBase64] = useState<string>("");
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const promises = Array.from(files).map(readFile);
      Promise.all(promises).then(lastStep);
    }
  };

  const readFile = (file: File) => {
    return new Promise<{
      result: string | ArrayBuffer | null;
      filename: string;
    }>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        resolve({
          result: event?.target?.result ?? null, // Ensure result is not undefined
          filename: file.name,
        });
      };

      reader.onerror = reject;
    });
  };

  const lastStep = (
    data: { result: string | ArrayBuffer | null; filename: string }[]
  ) => {
    console.log("last step");
    console.log(data);
    if (data[0].result !== null) {
      // Ensure result is not null before proceeding
      fetchFile({
        filename: data[0].filename,
        base64: data[0].result as string,
      });
      setAnchorEl(null);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ justifyContent: "right" }}
      >
        <Box
          title={"Attach file"}
          component="img"
          sx={{
            height: "30px",
          }}
          alt="attach file"
          src={"./images/icons/paperclip.png"}
        />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          top: "-60px",
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ justifyContent: "space-between" }}
        >
          <Box>Take Photo</Box>
          <CameraAltOutlinedIcon />
        </MenuItem>
        {/* file upload */}
        <MenuItem sx={{ justifyContent: "space-between" }}>
          <Box component="label" sx={{ cursor: "pointer" }}>
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Box>
          <PictureAsPdfOutlinedIcon />
        </MenuItem>
        {/* file upload */}
        <MenuItem
          onClick={handleClose}
          sx={{ justifyContent: "space-between" }}
        >
          <Box mr={1}>Photo Library</Box> <FolderCopyOutlinedIcon />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Clip;
