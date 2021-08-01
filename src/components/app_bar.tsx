import React, { VFC } from "react";

import {
  AppBar as MUIAppBar,
  Box,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
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
        <Tooltip title="Show source in GitHub">
          <IconButton size="large" color="default" onClick={goGH}>
            <GitHub />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </MUIAppBar>
  );
};
