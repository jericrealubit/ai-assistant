import { Box, Stack } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";

const Header = () => {
  return (
    <div>
      <Stack direction="row" justifyContent="space-between" spacing={2} mt={4}>
        <Box sx={{ display: "flex" }}>
          <MenuRoundedIcon sx={{ marginTop: "7px" }} />
          <Box sx={{ fontWeight: "bold", m: 1 }}>DatacomAI</Box>
        </Box>
        {/* <Box sx={{ display: "flex", marginTop: "7px" }}>
          <StickyNote2OutlinedIcon sx={{ marginRight: "5px" }} />
          <AutoAwesomeOutlinedIcon />
        </Box> */}
        <Box sx={{ display: "flex" }}>
          <Box
            component="img"
            sx={{ height: 20, width: 20, color: "#7f8487", marginTop: "7px" }}
            alt="star"
            src={"./images/icons/star.jpg"}
          />
        </Box>
      </Stack>
    </div>
  );
};
export default Header;
