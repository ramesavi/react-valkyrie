import React from "react";
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Alarm, ComputerTwoTone, Group, Storage, ViewList} from "@material-ui/icons";
import {Link} from "react-router-dom"

const drawerWidth = 240;

const useStyles = makeStyles(theme => {
    // console.log(theme);
    return {
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },

        drawerPaper: {
            width: "100%",
            height: "auto",
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                height: "100%"
            }
        },
        toolbar: theme.mixins.toolbar,
    };
});


export default () => {

    const classes = useStyles();

    return (
        <Drawer className={classes.drawer} classes={{paper: classes.drawerPaper}} variant="permanent">
            <div className={classes.toolbar}/>
            <List>
                <ListItem button component={Link} to="/jobs">
                    <ListItemIcon>
                        <Storage/>
                    </ListItemIcon>
                    <ListItemText primary={"Jobs"}/>
                </ListItem>
                <ListItem button component={Link} to="/triggers">
                    <ListItemIcon>
                        <Alarm/>
                    </ListItemIcon>
                    <ListItemText primary={"Triggers"}/>
                </ListItem>
                <ListItem button component={Link} to="/groups">
                    <ListItemIcon>
                        <Group/>
                    </ListItemIcon>
                    <ListItemText primary={"Groups"}/>
                </ListItem>
                <ListItem button component={Link} to="/instances">
                    <ListItemIcon>
                        <ViewList/>
                    </ListItemIcon>
                    <ListItemText primary={"Instances"}/>
                </ListItem>
                <ListItem button component={Link} to="/agents">
                    <ListItemIcon>
                        <ComputerTwoTone/>
                    </ListItemIcon>
                    <ListItemText primary={"Agents"}/>
                </ListItem>
            </List>
        </Drawer>
    );
};
