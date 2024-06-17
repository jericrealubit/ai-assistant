"use client";

import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import Clip from "./Clip";
import { useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import axios from "axios";

const HomeScreen = () => {
  const [agentPlaceholder, setAgentPlaceholder] = useState(
    "Message ChatGPT...|"
  );

  const [uploadedFile, setUploadedFile] = useState({});
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState({});
  const [thinking, setThinking] = useState(false);

  const fetchFile = (fileObj: { filename: string; base64: string }) => {
    setUploadedFile(fileObj);
    // focus on the input query

    document.getElementById("chatQuery")?.focus();

    return fileObj;
  };

  const paperStyle = {
    padding: "5px 10px",
    backgroundColor: "#e0e0e0",
    display: "flex",
    border: "1px solid transparent",
    borderRadius: "100px",
    cursor: "pointer",
  };

  const paperStyleSelected = {
    padding: "5px 10px",
    backgroundColor: "#e0e0e0",
    display: "flex",
    border: "1px solid black",
    borderRadius: "100px",
    cursor: "pointer",
    color: "black",
  };

  const iconStyle = {
    height: 20,
    width: 20,
    marginRight: 1,
    color: "#7f8487",
  };

  const agentTypes = [
    {
      name: "Industry Expert",
      imagename: "industry-expert",
      placeholder: "Summarise and update on ...|",
    },
    {
      name: "5 Year Old",
      imagename: "5-year-old",
      placeholder: "Explain easily about ...|",
    },
    {
      name: "Notetaker",
      imagename: "notetaker",
      placeholder: "Save this note about ...|",
    },
    {
      name: "Journalist",
      imagename: "journalist",
      placeholder: "Find the latest news on ...|",
    },
    {
      name: "Scholar",
      imagename: "scholar",
      placeholder: "Find the latest research on ...|",
    },
    {
      name: "Creative",
      imagename: "creative",
      placeholder: "Let's brainstorm ideas on ...|",
    },
    {
      name: "Analyst",
      imagename: "analyst",
      placeholder: "Analyse this data on ...|",
    },
  ];

  const handleAgentClick = (agent: { placeholder: string }) => {
    setAgentPlaceholder(agent.placeholder);
  };

  const handleApiCall = async (query: string) => {
    setThinking(true);
    console.log(query);
    console.log(uploadedFile.filename);
    console.log(uploadedFile.base64);
    const data = {
      chat_history: [],
      Agent: "FinancePlanner",
      question: query,
      topic:
        "https://s201.q4cdn.com/287523651/files/doc_financials/2023/ar/cost-annual-report-final-pdf-from-dfin.pdf",
    };

    try {
      const response = await axios.post<any>("/api/agentChatResponse", data);
      setThinking(false);
      console.log(response.data.data);
      document.getElementById(
        "ans"
      ).innerHTML = `Answer: ${response.data.data.answer}`;
    } catch (error) {
      console.error(error);
    }
  };

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
          const agentStyle =
            agentPlaceholder === agent.placeholder
              ? paperStyleSelected
              : paperStyle;

          const agentLabelStyle =
            agentPlaceholder === agent.placeholder
              ? { color: "black" }
              : { color: "#7f8487" };

          return (
            <Paper
              title={agent.name}
              sx={agentStyle}
              elevation={0}
              key={i}
              onClick={() => handleAgentClick(agent)}
            >
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

      <Box sx={{ display: "flex", gap: "10px" }}>
        {uploadedFile.filename && <Box>File: {uploadedFile.filename}</Box>}
        {uploadedFile.base64 && <Box>Length: {uploadedFile.base64.length}</Box>}
      </Box>

      <TextField
        title="Ask me anything..."
        id="chatQuery"
        label=""
        placeholder={agentPlaceholder}
        multiline
        variant="standard"
        sx={{ width: "100%" }}
        InputProps={{
          disableUnderline: true,
          margin: "10px 5PX",
        }}
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
        }}
      />

      {query && (
        <Box title={"Send"}>
          <SendOutlinedIcon
            sx={{ cursor: "pointer", color: "gray" }}
            onClick={() => handleApiCall(query)}
          />
        </Box>
      )}

      {thinking && (
        <Box
          component="img"
          sx={{
            height: 12,
            width: 40,
            marginLeft: 1,
            color: "#7f8487",
            marginTop: "7px",
          }}
          alt="Industry Expert"
          src={"./images/icons/typing.gif"}
        />
      )}

      <Box id="ans" />

      <Clip fetchFile={fetchFile} />
      <Footer />
    </Box>
  );
};
export default HomeScreen;
