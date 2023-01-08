import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";
import { InputField, ProdList } from "components";
import { useReduxSelector } from "store";
import "./App.css";

function App() {
  const { error } = useReduxSelector((state) => state.products);
  const content = error ? (
    <Alert severity="error" sx={{ width: 1 / 2 }}>
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  ) : (
    <>
      <InputField />
      <ProdList />
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {content}
    </Box>
  );
}

export default App;
