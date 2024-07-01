import { useState } from "react";
import { Box, styled, MenuItem, Menu, Button } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

const Clip = ({ fetchFile: {} }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fileBase64, setFfileBase64] = useState<string>("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //------------------------------------------------------------------------------

  // onChange listener
  function handleFileChange(event) {
    const promises = [];
    for (const file of event.target.files) promises.push(readFile(file));
    Promise.all(promises).then(lastStep);
  }

  // read one file
  function readFile(f) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);

      reader.onload = (event) => {
        return resolve({
          result: event?.target?.result,
          filename: f.name,
        });
      };

      reader.onerror = reject;
    });
  }

  // example last step
  function lastStep(data) {
    console.log("last step");
    console.log(data);
    const res = fetchFile({
      filename: data[0].filename,
      base64: data[0].result,
    });
    console.log(res);

    setAnchorEl(null);
  }

  //------------------------------------------------------------------------------

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
          alt="attache file"
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
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleFileChange(e)}
            />
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
