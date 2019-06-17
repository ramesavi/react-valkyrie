import React from "react";
import SideDrawer from "./SideDrawer";
import TopBar from "./TopBar";

export default props => {
  return (
    <>
      <TopBar {...props} />
      <SideDrawer />
    </>
  );
};
