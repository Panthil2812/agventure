import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="#325240"
      sx={{ mt: 5, fontWeight: "bold" }}
      align="center"
    >
      {"Copyright © "}
      <Link color="#325240" href="https://google.com/">
        Agventure
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
