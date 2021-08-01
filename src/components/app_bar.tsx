import React, { VFC } from "react";

import {
  AppBar as MUIAppBar,
  Box,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  Link,
} from "@material-ui/core";
import { GitHub } from "@material-ui/icons";

export const AppBar: VFC = () => {
  const goGH = () => {
    window.open("https://github.com/nishisuke/react-samples");
  };

  return (
    <MUIAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          @nishisuke's react demos
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" component="div">
          <Link
            target="_blank"
            href="https://github.com/nishisuke/calentasks"
            color="textPrimary"
          >
            PWA Calendar & TODOs App
          </Link>
        </Typography>
        <Box sx={{ width: 8 }} />
        <Tooltip title="Show source in GitHub">
          <IconButton size="large" color="default" onClick={goGH}>
            <GitHub />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </MUIAppBar>
  );
};
