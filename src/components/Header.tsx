import React from "react";
import { Box } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

interface HeaderProps {
  setPageDisplay: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setPageDisplay }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: 1,
        m: 1,
      }}
    >
      <Box>
        <MenuRoundedIcon sx={{ marginTop: "7px", cursor: "pointer" }} />
      </Box>
      <Box sx={{ fontWeight: "bold", m: 1, cursor: "pointer" }}>DatacomAI</Box>
      <Box title="Home">
        <HomeOutlinedIcon
          sx={{ marginTop: "7px", cursor: "pointer" }}
          onClick={() => setPageDisplay("none")}
        />
      </Box>
    </Box>
  );
};

export default Header;
