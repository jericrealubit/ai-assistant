import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const HomeScreen = () => {
  const paperStyle = {
    padding: "5px 10px",
    backgroundColor: "#e0e0e0",
    display: "flex",
    border: "1px solid transparent",
    borderRadius: "100px",
  };

  const iconStyle = {
    height: 20,
    width: 20,
    marginRight: 1,
    color: "#7f8487",
  };

  const agentLabelStyle = { color: "#7f8487" };

  const agentTypes = [
    { name: "Industry Expert", imagename: "industry-expert" },
    { name: "5 Year Old", imagename: "5-year-old" },
    { name: "Notetaker", imagename: "notetaker" },
    { name: "Journalist", imagename: "journalist" },
    { name: "Scholar", imagename: "scholar" },
    { name: "Creative", imagename: "creative" },
    { name: "Analyst", imagename: "analyst" },
  ];

  return (
    <Box>
      <Header />
      <Typography my={5} variant="h5">
        Hello Daniel!
      </Typography>

      <Typography my={2} sx={{ fontWeight: "bold" }}>
        Select an Agent
      </Typography>

      <Grid
        m={1}
        container
        rowSpacing={1}
        columnSpacing={1}
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ overflowY: "scroll", color: "#7f8487" }}
        gap={1}
      >
        {agentTypes.map((agent, i) => {
          return (
            <Paper sx={paperStyle} elevation={0} key={i}>
              <Box
                component="img"
                sx={iconStyle}
                alt="Industry Expert"
                src={"./images/icons/" + agent.imagename + ".jpg"}
              />
              <Typography sx={agentLabelStyle}>{agent.name}</Typography>
            </Paper>
          );
        })}
      </Grid>

      <Box my={2} sx={{ display: "flex" }}>
        <Typography sx={{ fontWeight: "bold" }}>Select Project </Typography>
        <Box
          component="img"
          sx={{
            height: 12,
            width: 30,
            marginLeft: 1,
            color: "#7f8487",
            marginTop: "7px",
          }}
          alt="Industry Expert"
          src={"./images/icons/chevron-down.jpg"}
        />
      </Box>

      <TextField
        id="standard-textarea"
        label=""
        placeholder="Message ChatGPT...|"
        multiline
        variant="standard"
        InputProps={{ disableUnderline: true }}
      />

      <Box
        component="img"
        sx={{
          height: "25px",
          position: "fixed",
          bottom: "40px",
          width: "25px",
          right: "10%",
        }}
        alt="Industry Expert"
        src={"./images/icons/clip.jpg"}
      />

      <Footer />
    </Box>
  );
};
export default HomeScreen;
