import TextField from "@mui/material/TextField";
import { useRef, useEffect } from "react";

const FocusInputComponent = ({ data, handleChange, path, schema, clickedField, setClickedField }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (path === clickedField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [clickedField, path]);

  return (
    <TextField
      inputRef={inputRef}
      value={data || ""}
      onClick={() => {
        if (!data) setClickedField(path);
      }}
      onChange={(ev) => handleChange(path, ev.target.value)}
      label={schema.title}
      fullWidth
      margin="normal"
    />
  );
};

export default FocusInputComponent;
