import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/ContentPasteSearch";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "store";
import { fetchData } from "reducers/products";
// import { useReduxSelector } from "store";

export default function InputField() {
  const [input, setInput] = useState(0);
  const dispatch = useReduxDispatch();
  const total = useReduxSelector((state) => state.products.total);
  const inputError = input > total;
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    if (+value >= 0) {
      setInput(+value | 0);
    }
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    if (inputError) {
      return undefined;
    }
    dispatch(fetchData({ id: input }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        size="small"
        label="Type ID"
        value={input || ""}
        onChange={handleChange}
        error={inputError}
        helperText={inputError && `Id should't be more of ${total}`}
      />
      <IconButton children={<SearchIcon />} type="submit" />
    </form>
  );
}
