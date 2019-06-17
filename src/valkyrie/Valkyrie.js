import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Navbar from "./components/navigation/Navbar";
import { BrowserRouter } from "react-router-dom";
import GlobalContext from "./context/GlobalContext";
import axios from "axios";
import SelectGroup from "./components/SelectGroup";
import Grid from "@material-ui/core/Grid";
import Routes from "./components/Routes";
import { useCookies } from "react-cookie";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "/api";
}

const useStyles = makeStyles(theme => {
  return {
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  };
});

const Valkyrie = () => {
  const classes = useStyles();
  const [{ group }, setCookie] = useCookies(["group"]);
  const [groups, setGroups] = useState(null);
  const [open, setOpen] = useState(group == null);

  useEffect(() => {
    axios.get("/groups").then(response => setGroups(response.data));
  }, []);

  const setGroup = group => {
    setCookie("group", group);
  };

  const groupSelectHandler = group => {
    setGroup(group);
    setOpen(false);
  };

  const groupSelectCloseHandler = () => {
    if (group != null) {
      setOpen(false);
    } else {
      alert("Select a Group");
    }
  };

  const groupIconClickHandler = () => setOpen(true);

  return (
    <>
      {open && (
        <SelectGroup
          open={open}
          groups={groups}
          onSelect={groupSelectHandler}
          onClose={groupSelectCloseHandler}
          selected={group}
        />
      )}
      <BrowserRouter>
        <GlobalContext.Provider value={{ group: group }}>
          <Grid container wrap={"nowrap"}>
            <Grid item>
              <Navbar
                group={group != null ? group.name : null}
                onGroupClick={groupIconClickHandler}
              />
            </Grid>

            <Grid item classes={{ item: classes.content }}>
              {group != null && (
                <main>
                  <div className={classes.toolbar} />
                  <Routes group={group} />
                </main>
              )}
            </Grid>
          </Grid>
        </GlobalContext.Provider>
      </BrowserRouter>
      }
    </>
  );
};

export default Valkyrie;
