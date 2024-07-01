"use client";

import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Collapse,
  FormControl,
  styled,
  Stack,
} from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import Clip from "./Clip";
import { Fragment, useState, useRef, useEffect } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { Qahiri } from "next/font/google";

const HomeScreen = () => {
  const [agentPlaceholder, setAgentPlaceholder] = useState(
    "Message ChatGPT...|"
  );

  const [uploadedFile, setUploadedFile] = useState<{
    filename?: string;
    base64?: string;
  }>({});
  const [query, setQuery] = useState("");
  const [previousQuery, setPreviousQuery] = useState("");
  const [thinking, setThinking] = useState(false);
  const [agentToggle, setAgentToggle] = useState(false);
  const [projectToggle, setProjectToggle] = useState(false);
  const [pageDisplay, setPageDisplay] = useState("none"); // page switch homePage and chatPage
  const [chatAgentIcon, setChatAgentIcon] = useState("Industry Expert");
  const [chatItems, setChatItems] = useState([]);
  //console.log({ chatItems });

  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const queryInputRef = useRef<HTMLDivElement | null>(null);

  const fetchFile = (fileObj: { filename: string; base64: string }) => {
    setAgentPlaceholder("Ask me anythjing...");
    setPageDisplay("revert");
    setUploadedFile(fileObj);
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

  const projects = [
    {
      name: "Woolworth Project",
      members: "20+ Members",
    },
    {
      name: "AirNZ Project",
      members: "20+ Members",
    },
    {
      name: "NZ Inflation Studies",
      members: "20+ Members",
    },
  ];

  const handleAgentClick = (agent: { placeholder: string }) => {
    setAgentPlaceholder(agent.placeholder);
    setChatAgentIcon(agent.name);
  };

  const handleKeyDown = (e) => {
    console.log(e.target.value);
    if (e.keyCode == 13 && e.target.value.length > 0) {
      handleApiCall(e.target.value);
    }
  };

  const scrollDown = () => {
    document.querySelector("#chat-body").scrollTop =
      document.querySelector("#chat-body").scrollHeight;
  };

  function scrollToBottom() {
    const scrollHeight = document.querySelector("#chat-body").scrollHeight;
    // Use setTimeout to allow DOM updates before scrolling
    setTimeout(() => {
      window.scrollTo(0, scrollHeight);
    }, 0);
  }

  // handleApiCall =================================================================================================
  const handleApiCall = async (q: string) => {
    setQuery("");
    setChatItems((chatItems) => [...chatItems, q]);
    //get url from string
    let url = "";
    url = q.split(" ").find((word) => word.startsWith("http"));

    setPageDisplay("revert");
    setPreviousQuery(q);
    scrollToBottom();
    setAgentPlaceholder("Ask follow up...");

    if (url === undefined) {
      setChatItems((chatItems) => [
        ...chatItems,
        "Topic is required, please include a URL in the chat, it should start with 'http'.",
      ]);
      return;
    }

    setThinking(true);
    const data = {
      chat_history: chatItems,
      Agent: chatAgentIcon,
      question: q,
      topic: url,
    };
    // "https://s201.q4cdn.com/287523651/files/doc_financials/2023/ar/cost-annual-report-final-pdf-from-dfin.pdf",

    try {
      const response = await axios.post<any>("/api/agentChatResponse", data);
      setThinking(false);
      const responseData = response.data.data.topic_output[0];

      setChatItems((chatItems) => [...chatItems, responseData]);

      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
    setThinking(false);
  };
  // handleApiCall =================================================================================================

  const handleChatAgentClick = (event) => {
    console.log(event.target.innerText.replace(/\s+/g, "-").toLowerCase());
    setChatAgentIcon(event.target.innerText);
  };

  useEffect(() => {
    console.log(chatItems);
  }, [chatItems]);

  return (
    <Fragment>
      <Container
        sx={{
          border: "1px solid grey",
          borderRadius: "20px",
          backgroundImage: "url('./images/icons/background.gif')",
          backgroundSize: "cover",
          maxWidth: "false",
          minWidth: "320px",
          height: "100vh",
          margin: 0,
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        <Header setPageDisplay={setPageDisplay} />

        {/* homePage ----------------------------------------------------------------- */}
        <Box id="homepage">
          {/* greet */}
          {pageDisplay !== "revert" && (
            <Typography
              my={10}
              variant="h4"
              align="center"
              sx={{ cursor: "pointer" }}
            >
              Hello Mark
            </Typography>
          )}

          {/* Select Agent */}
          {pageDisplay !== "revert" && (
            <Box
              title={agentToggle ? "Collapse" : "Expand"}
              sx={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
              }}
            >
              <Typography
                my={2}
                sx={{ fontWeight: "bold" }}
                onClick={() => setAgentToggle(!agentToggle)}
              >
                Select an Agent
              </Typography>
              {agentToggle ? (
                <ExpandLessOutlinedIcon sx={{ marginTop: "16px" }} />
              ) : (
                <ExpandMoreOutlinedIcon sx={{ marginTop: "16px" }} />
              )}
            </Box>
          )}
          {pageDisplay !== "revert" && (
            <Collapse in={agentToggle}>
              <Grid
                m={1}
                container
                rowSpacing={1}
                columnSpacing={1}
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ color: "#7f8487" }}
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
                        alt={agent.name}
                        src={"./images/icons/" + agent.imagename + ".jpg"}
                      />
                      <Typography sx={agentLabelStyle}>{agent.name}</Typography>
                    </Paper>
                  );
                })}
              </Grid>
            </Collapse>
          )}

          {/* Select Project */}
          {pageDisplay !== "revert" && (
            <Box
              title={projectToggle ? "Collapse" : "Expand"}
              sx={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
              }}
            >
              <Typography
                my={2}
                sx={{ fontWeight: "bold" }}
                onClick={() => setProjectToggle(!projectToggle)}
              >
                Select Project
              </Typography>
              {projectToggle ? (
                <ExpandLessOutlinedIcon sx={{ marginTop: "16px" }} />
              ) : (
                <ExpandMoreOutlinedIcon sx={{ marginTop: "16px" }} />
              )}
            </Box>
          )}
          {pageDisplay !== "revert" && (
            <Collapse in={projectToggle}>
              <Grid
                m={1}
                container
                rowSpacing={1}
                columnSpacing={1}
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ overflowX: "scroll", color: "#7f8487", display: "flex" }}
                gap={5}
              >
                {projects.map((project, i) => {
                  return (
                    <Paper
                      title={project.name}
                      elevation={0}
                      key={i}
                      sx={{
                        borderRadius: "20px",
                        paddingX: "15px",
                        paddingY: "5px",
                        marginX: "10px",
                      }}
                    >
                      <Typography variant="h6">{project.name}</Typography>
                      <Typography>{project.members}</Typography>
                    </Paper>
                  );
                })}
              </Grid>
            </Collapse>
          )}
        </Box>

        {/* chatPage -----------------------------------------------------------------*/}
        <Box
          id="chatpage"
          sx={{
            top: "85px",
            bottom: "23px",
            position: "absolute",
            width: "92%",
            display: pageDisplay,
          }}
        >
          {/* chat-header */}
          <Box
            id="chat-header"
            sx={{
              borderRadius: "20px",
            }}
          >
            <Stack
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
              spacing={1}
            >
              {previousQuery && (
                <Box sx={{ display: "flex" }}>
                  <Box
                    title={"Query icon"}
                    component="img"
                    width={50}
                    height={50}
                    alt="Query icon"
                    src={"./images/icons/query-icon.png"}
                  />
                  <Box
                    px={2}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      display: "inline",
                      alignContent: "center",
                    }}
                  >
                    {previousQuery}
                  </Box>
                </Box>
              )}

              {uploadedFile?.filename && (
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    marginTop: "5px",
                    padding: "5px 10px",
                  }}
                  gap={1}
                >
                  <Box
                    pl={3}
                    sx={{
                      backgroundImage: "url('./images/icons/pdf.png')",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {uploadedFile?.filename}
                  </Box>
                </Box>
              )}
            </Stack>
            <Box
              m={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
                gap: "5px",
                flexWrap: "wrap",
              }}
            >
              {agentTypes.map((agent, i) => {
                return (
                  <Box title={agent.name} key={i}>
                    <Typography
                      onClick={() => handleChatAgentClick(event)}
                      display="inline"
                      sx={{
                        fontWeight:
                          chatAgentIcon === agent.name ? "bold" : "light",
                        cursor: "pointer",
                        "&:hover": {
                          fontWeight: "bold",
                        },
                      }}
                    >
                      {agent.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {chatAgentIcon && (
              <Box
                pr={2}
                mb={1}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundImage: "url('./images/icons/background.gif')",
                  borderRadius: "50px",
                  width: "fit-content",
                }}
              >
                <Box
                  m={2}
                  component="img"
                  sx={iconStyle}
                  alt={chatAgentIcon}
                  src={
                    "./images/icons/" +
                    chatAgentIcon.replace(/\s+/g, "-").toLowerCase() +
                    ".jpg"
                  }
                />
                <Typography sx={{ marginTop: "13px" }}>
                  {chatAgentIcon}
                </Typography>
              </Box>
            )}
          </Box>

          {/* chat-body */}
          <Box
            id="chat-body"
            p={3}
            mb={5}
            sx={{
              border: "1px solid white",
              backgroundColor: "white",
              borderRadius: "20px",
              top: "190px",
              width: "100%",
              bottom: "-20px",
              position: "absolute",
              overflowY: "scroll",
            }}
          >
            {/* chat conversation ===================================================================== */}
            <Box>
              <Box>
                {chatItems.map((c, i) => {
                  return (
                    <Typography
                      p={1}
                      mb={1}
                      index={i}
                      sx={{
                        backgroundColor: i % 2 === 0 ? "#cfd8dc" : "#e0e0e0",
                        borderRadius: "10px",
                        overflowY: "auto",
                      }}
                    >
                      {c}
                    </Typography>
                  );
                })}
              </Box>
              {thinking && (
                <Box mb={1} sx={{ display: "flex", flexDirection: "col" }}>
                  <Box>Generating answer... </Box>
                  <Box ml={3} className="loader"></Box>
                </Box>
              )}
            </Box>
            {/* chat conversation ===================================================================== */}

            <Box sx={{ display: "flex", gap: "10px" }}>
              {uploadedFile.filename && (
                <Box>File: {uploadedFile.filename}</Box>
              )}
              {uploadedFile.base64 && (
                <Box>Length: {uploadedFile.base64.length}</Box>
              )}
            </Box>
          </Box>
        </Box>

        <FormControl
          fullWidth
          sx={{
            backgroundColor: "white",
            borderRadius: "50px",
            border: "1px solid white",
            height: "50px",
            bottom: "24px",
            position: "absolute",
            width: "92%",
            overflow: "hidden",
            pageDisplay: 2,
          }}
        >
          <Grid
            xs={12}
            pt={1}
            px={1}
            container
            spacing={1}
            alignItems="center"
            sx={{
              bottom: 0,
              position: "sticky",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* input */}
            <Grid xs={9} sx={{}}>
              <TextField
                id="query"
                variant="standard"
                title="Ask me anything..."
                label=""
                placeholder={agentPlaceholder}
                InputProps={{
                  disableUnderline: true,
                }}
                value={query}
                onChange={(e) => {
                  setQuery(e.currentTarget.value);
                }}
                sx={{
                  fontSize: "x-large",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "10px",
                }}
                onKeyDown={() => handleKeyDown(event)}
              />
            </Grid>
            {/* send icon */}
            <Grid
              title="Attach File"
              xs={1}
              sx={{
                marginTop: "3px",
              }}
            >
              {query && (
                <Box title={"Send"}>
                  {pageDisplay === "none" ? (
                    <SendOutlinedIcon
                      sx={{
                        cursor: "pointer",
                        color: "gray",
                        float: "inline-end",
                      }}
                      onClick={() => handleApiCall(query)}
                    />
                  ) : (
                    <SendIcon
                      sx={{
                        cursor: "pointer",
                        color: "gray",
                        float: "inline-end",
                      }}
                      onClick={() => handleApiCall(query)}
                    />
                  )}
                </Box>
              )}
            </Grid>
            {/* clip */}
            <Grid
              title="Attach File"
              xs={2}
              sx={{
                marginTop: "3px",
                justifyContent: "right",
                padding: 0,
              }}
            >
              <Clip fetchFile={fetchFile} />
            </Grid>
          </Grid>
        </FormControl>

        {/* <Footer /> */}
      </Container>
    </Fragment>
  );
};

export default HomeScreen;
