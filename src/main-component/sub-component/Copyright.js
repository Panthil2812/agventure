import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="#33691e"
      sx={{ mt: 5, fontWeight: "bold" }}
      align="center"
    >
      {"Copyright © "}
      <Link color="#33691e" href="https://google.com/">
        Agventure
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
