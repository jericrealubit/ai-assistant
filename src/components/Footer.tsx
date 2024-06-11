"use client";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState } from "react";

const Footer = () => {
  const [value, setValue] = useState("recents");

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{
        height: "15px",
        position: "fixed",
        bottom: "40px",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        zIndex: -1,
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
  );
};
export default Footer;
