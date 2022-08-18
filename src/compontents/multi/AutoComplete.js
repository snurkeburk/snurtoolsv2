import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import "../../styles/Task/AddTask.css";
export default function Tags(props) {
  const opts = [props.user[0]];
  props.friends.forEach((friend) => {
    opts.push(friend);
  });
  console.log(opts);
  return (
    <Stack>
      <Autocomplete
        multiple
        id="tags-outlined"
        limitTags={2}
        options={opts}
        getOptionLabel={(option) =>
          option.username === props.user[0].username
            ? option.username + " (You)"
            : option.username
        }
        onChange={(event, value) => {
          return "cock ";
        }}
        defaultValue={[opts[0]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add this task for: "
            placeholder="Users"
          />
        )}
      />
    </Stack>
  );
}
