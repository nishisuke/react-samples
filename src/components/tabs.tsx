import React, { VFC } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Box, Tabs as MUITabs, Tab } from "@material-ui/core";

const tabNames = ["Task board", "Text chat", "Video chat"];
const tabPaths = ["/cardboard", "/messages", "/webrtc"];

export const Tabs: VFC = () => {
  const isSecond = useRouteMatch(tabPaths[1]);
  const isThird = useRouteMatch(tabPaths[2]);
  const defaultTab = isSecond ? 1 : isThird ? 2 : 0;
  const [currentTab, setCurrentTab] = React.useState(defaultTab);
  const history = useHistory();

  const handleChange = (_: unknown, newValue: number) => {
    setCurrentTab(newValue);
    const path = tabPaths[newValue];
    if (!path) throw new Error("MECE error in tab");
    history.push(path);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <MUITabs value={currentTab} onChange={handleChange} aria-label="tabs">
        {tabNames.map((tabName, index) => (
          <Tab
            key={index}
            label={tabName}
            id={`tab-${currentTab}`}
            aria-controls={`tabpanel-${currentTab}`}
          />
        ))}
      </MUITabs>
    </Box>
  );
};
