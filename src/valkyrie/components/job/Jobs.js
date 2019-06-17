import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Button, IconButton } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import UpdateJob from "./UpdateJob";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "../SnackBar";
import NewJob from "./NewJob";

export default props => {
  const [jobs, setJobs] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [jobInAction, setJobInAction] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(1);
  const [{ message, variant }, setMessage] = useState({});
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [showNew, setShowNew] = useState(false);

  console.log(triggerRefresh);

  const { group } = props;
  useEffect(() => {
    console.log("Jobs api called");
    axios
      .get("/job/list/group/" + group.id)
      .then(response => setJobs(response.data));
  }, [group.id, triggerRefresh]);

  const deleteHandler = row => {
    setJobInAction(row);
    setShowDeleteDialog(true);
  };

  const updateHandler = job => {
    setJobInAction(job);
    setShowUpdate(true);
  };

  const jobUpdatedHandler = () => {
    setTriggerRefresh(pv => pv + 1);
    setShowSnackBar(true);
  };

  const jobCreatedHandler = () => {
    setTriggerRefresh(pv => pv + 1);
    setShowSnackBar(true);
  };

  async function deleteYesClickHandler() {
    axios
      .post(`/job/delete/group/${group.id}/job/${jobInAction.id}`)
      .then(response => {
        console.log(response);
        setShowDeleteDialog(false);
        setMessage({ variant: "success", message: response.data.message });
        setTriggerRefresh(pv => pv + 1);
        setShowSnackBar(true);
      });
  }

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div style={{ marginTop: "25px" }}>
      <Button
        color={"primary"}
        variant={"outlined"}
        style={{ marginBottom: "15px" }}
        onClick={() => setShowNew(true)}
      >
        New Job
      </Button>

      <MaterialTable
        columns={[
          {
            title: "Name",
            field: "name",
            render: row => (
              <Link to={"/instance/job/list/" + row.id}>{row.name}</Link>
            )
          },
          { title: "Description", field: "desc" },
          { title: "Command", field: "command" },
          {
            title: "Edit",
            render: job => (
              <IconButton
                onClick={updateHandler.bind(this, job)}
                color={"primary"}
              >
                <EditIcon />
              </IconButton>
            )
          },
          {
            title: "Delete",
            render: job => (
              <IconButton
                onClick={deleteHandler.bind(this, job)}
                color={"secondary"}
              >
                <DeleteIcon />
              </IconButton>
            )
          }
        ]}
        data={jobs}
        title="Jobs"
        options={{
          // filtering: true,
          exportButton: true
        }}
      />

      {showDeleteDialog && (
        <DeleteConfirmationDialog
          name={jobInAction.name}
          onClickYes={deleteYesClickHandler}
          onClickNo={closeDeleteDialog}
        />
      )}
      {showUpdate && (
        <Dialog open fullWidth maxWidth={"lg"}>
          <UpdateJob
            jobId={jobInAction.id}
            group={group}
            setShow={setShowUpdate}
            triggerRefresh={setTriggerRefresh}
            onUpdate={setMessage}
            jobUpdatedCallback={jobUpdatedHandler}
            setMessage={setMessage}
          />
        </Dialog>
      )}

      {showNew && (
        <Dialog open fullWidth maxWidth={"lg"}>
          <NewJob
            group={group}
            setShow={setShowNew}
            triggerRefresh={setTriggerRefresh}
            onUpdate={setMessage}
            jobCreatedCallback={jobCreatedHandler}
            setMessage={setMessage}
          />
        </Dialog>
      )}

      {variant && (
        <Snackbar
          open={showSnackBar}
          setOpen={setShowSnackBar}
          variant={variant}
          message={message}
        />
      )}
    </div>
  );
};
