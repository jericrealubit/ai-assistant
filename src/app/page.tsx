import HomeScreen from "@/components/HomeScreen";
import { Box } from "@mui/material";
import Layout from "@/components/Layout";
import Bar from "@/components/bar/Bar";
import Chat from "@/components/chat/Chat";

const Home = () => {
  return (
    <Layout>
      {/* <Bar /> */}
      {/* <Chat /> */}
      <HomeScreen />
    </Layout>
  );
};
export default Home;
