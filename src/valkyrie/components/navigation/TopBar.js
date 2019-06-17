import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Group } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import useTheme from "@material-ui/core/styles/useTheme";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    flexGrow: {
      flexGrow: 1
    }
  };
});

export default props => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Link
          to={"/"}
          component={RouterLink}
          variant={"h6"}
          style={{
            color: theme.palette.common.white,
            textDecoration: "none"
          }}
        >
          Vakyire
        </Link>
        <div className={classes.flexGrow} />
        <IconButton onClick={props.onGroupClick} style={{ color: "white" }}>
          <Group />
          <Typography
            variant="caption"
            style={{ color: "white", paddingLeft: "5px" }}
          >
            {props.group}
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
