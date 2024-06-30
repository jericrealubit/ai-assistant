import { Box, Stack } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import { Home } from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const Header = ({ setPageDisplay }) => {
  function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
        }}
        {...other}
      />
    );
  }

  return (
    <div>
      {/* <Stack direction="row" justifyContent="space-between" spacing={2} mt={4}> */}
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
        <Box>
          <Box sx={{ fontWeight: "bold", m: 1, cursor: "pointer" }}>
            DatacomAI
          </Box>
        </Box>
        <Box title="Home">
          <HomeOutlinedIcon
            sx={{ marginTop: "7px", cursor: "pointer" }}
            onClick={() => setPageDisplay("none")}
          />
        </Box>
      </Box>
    </div>
  );
};
export default Header;
