import { InputFile } from "@/components/InputFile";
import { Box, Button, Stack, TextField } from "@mui/material";

const FormFileInput = () => {
  return (
    <Box
      m={2}
      display="flex flex-row"
      p={2}
      sx={{ border: "1px solid grey", width: "92%", height: "100%" }}
    >
      <Box
        my={2}
        p={2}
        sx={{ border: "1px solid grey", width: "100%", height: "auto" }}
      >
        <p>AI output will show here</p>
      </Box>
      <InputFile />
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          label="Enter your question"
          variant="outlined"
        />
        <Button variant="outlined" size="large">
          send
        </Button>
      </Stack>
    </Box>
  );
};
export default FormFileInput;
