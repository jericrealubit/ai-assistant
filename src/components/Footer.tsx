"use client";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState } from "react";

const Footer = () => {
  const [value, setValue] = useState("");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          bottom: "20px",
          position: "absolute",
        }}
      >
        <BottomNavigationAction
          sx={{
            maxWidth: "3px",
            minWidth: "2px",
          }}
          icon={
            <Box
              component="img"
              sx={{
                height: 10,
                width: 10,
              }}
              alt="Current"
              src={"./images/icons/path-1.jpg"}
            />
          }
        />
        <BottomNavigationAction
          sx={{
            maxWidth: "3px",
            minWidth: "2px",
          }}
          icon={
            <Box
              component="img"
              sx={{
                height: 10,
                width: 10,
              }}
              alt="Next"
              src={"./images/icons/path-2.jpg"}
            />
          }
        />
      </BottomNavigation>
    </Box>
  );
};
export default Footer;
