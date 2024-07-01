"use client";

import React, { Fragment, useState, SetStateAction } from "react";
import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import "./Chat.css";

// Define the type for a chat message
interface ChatMessage {
  user: string;
  message: string;
}

const Chat: React.FC = () => {
  const ENTER_KEY_CODE = 13;

  // Initialize the state with the correct type
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [user, setUser] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      sendMessage();
    }
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const sendMessage = () => {
    if (user && message) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          user,
          message,
        },
      ]);
      setMessage("");
      console.log("Sent!");
    }
  };

  const listChatMessages = chatMessages.map((chatMessageDto, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={`${chatMessageDto.user}: ${chatMessageDto.message}`}
      />
    </ListItem>
  ));

  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h4">Happy Chatting</Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid id="chat-window" xs={12} item>
                <List id="chat-window-messages">{listChatMessages}</List>
              </Grid>
              <Grid xs={2} item>
                <FormControl fullWidth>
                  <TextField
                    onChange={handleUserChange}
                    value={user}
                    label="Nickname"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid xs={9} item>
                <FormControl fullWidth>
                  <TextField
                    onChange={handleMessageChange}
                    onKeyDown={handleEnterKey}
                    value={message}
                    label="Type your message..."
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid xs={1} item>
                <IconButton
                  onClick={sendMessage}
                  aria-label="send"
                  color="primary"
                >
                  <Send />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Chat;
