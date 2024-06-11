import HomeScreen from "@/components/HomeScreen";
import { Box } from "@mui/material";
import Layout from "@/components/Layout";

const Home = () => {
  return (
    <Layout>
      <Box
        sx={{
          border: "1px solid grey",
          minWidth: "20vh",
          minHeight: "calc(100vh - 30px)",
          borderRadius: "16px",
        }}
        p={2}
        m={2}
      >
        <HomeScreen />
      </Box>
    </Layout>
  );
};
export default Home;
