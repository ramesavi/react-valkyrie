import React from "react"
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

export default props => {

    const {name, onClickYes, onClickNo} = props;
    return (
        <Dialog open>
            <DialogTitle>
                {"Delete Job"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you want to delete <strong>{name}</strong>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color={"secondary"} onClick={onClickYes}>Yes</Button>
                <Button color={"primary"} onClick={onClickNo}>No</Button>
            </DialogActions>
        </Dialog>
    )
}