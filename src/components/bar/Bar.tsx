import { Chat } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Fragment } from "react";

const Bar = () => {
  return (
    <Fragment>
      <Box mb={4}>
        <AppBar position="static">
          <Toolbar>
            <Box mr={2}>
              <Chat fontSize={"large"} />
            </Box>
            <Typography variant="h6">React Chat App</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  );
};
export default Bar;
