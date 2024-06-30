"use client";

import { ChatMessageDto } from "@/model/ChatMessageDto";
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
import { Fragment, SetStateAction, useEffect, useState } from "react";
import "./Chat.css";
import { Send } from "@mui/icons-material";

const Chat = () => {
  const ENTER_KEY_CODE = 13;

  const [chatMessages, setChatMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const handleEnterKey = (event: { keycode: number }) => {
    console.log({ event });
    if (event.keycode === ENTER_KEY_CODE) {
      sendMessage();
    }
  };

  const handleMessageChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const handleUserChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUser(event.target.value);
  };

  const sendMessage = () => {
    if (user && message) {
      setChatMessages([
        ...chatMessages,
        {
          user,
          message,
        },
      ]);
      setMessage("");
      console.log("Sent!");
    }
  };

  const listChatMessages = chatMessages.map(
    (chatMessageDto: { user: String; message: string }, index) => (
      <ListItem key={index}>
        <ListItemText
          primary={`${chatMessageDto.user}: ${chatMessageDto.message}`}
        />
      </ListItem>
    )
  );

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
                    onKeyDown={() => handleEnterKey}
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
