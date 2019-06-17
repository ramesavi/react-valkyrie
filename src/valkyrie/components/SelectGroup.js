import Dialog from "@material-ui/core/Dialog";
import {DialogTitle} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {Group} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

export default props => {
    const {groups, onClose, onSelect, selected} = props;
    return (
        <Dialog open={props.open} onClose={onClose}>
            <DialogTitle>Select Group</DialogTitle>
            {
                groups == null ? <h6>Loading</h6> : (
                    <List>
                        {
                            groups.map(group => {
                                return (
                                    <ListItem button key={group.id} onClick={() => onSelect(group)}
                                              selected={selected != null && selected.id === group.id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Group/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${group.name} - ${group.email}`}/>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                )
            }
        </Dialog>

    )
}