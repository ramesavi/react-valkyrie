import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import uuid from "uuid";

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  heading: {
    textAlign: "center"
  }
}));

export default props => {
  const classes = useStyle();
  const { group, jobId, setShow, setMessage, jobCreatedCallback } = props;
  const [job, setJob] = useState({
    id: uuid.v1(),
    name: "",
    desc: "",
    command: "",
    working_dir: "",
    variables: {},
    email_on_failure: false,
    email_on_success: false
  });

  const createHandler = () => {
    axios
      .post(`/job/create/${group.id}`, job)
      .then(response => {
        jobCreatedCallback();
        setMessage({
          message: job.name + " " + response.data.message,
          variant: "success"
        });
        setShow(false);
      })
      .catch(error => {
        console.log(error.response);
        jobCreatedCallback();
        setMessage({
          message: "Crate Job failed " + error.response.data.error_message,
          variant: "error"
        });
      });
  };

  const cancelHandler = () => {
    setShow(false);
  };

  const changeHandler = (key, newValue) => {
    setJob(ps => ({
      ...ps,
      [key]: newValue
    }));
  };

  const keys = ["name", "desc", "command", "working_dir"];
  const label = ["Name", "Description", "Command", "Work Directory"];

  return (
    <Paper className={classes.root}>
      <Typography
        variant={"h4"}
        color={"primary"}
        className={classes.heading}
        gutterBottom
      >
        Create Job
      </Typography>

      {job != null && (
        <Grid container spacing={2}>
          {keys.map((key, index) => (
            <Grid item xs={12} key={key}>
              <TextField
                id="standard-required"
                label={label[index]}
                value={job[key]}
                variant={"outlined"}
                fullWidth
                multiline={key === "command"}
                onChange={event => changeHandler(key, event.target.value)}
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant={"caption"}>Email on Success</Typography>
            <Checkbox
              color={"primary"}
              checked={job.email_on_success}
              onChange={event =>
                changeHandler("email_on_success", event.target.checked)
              }
            />
            <Typography variant={"caption"}>Email on Failure</Typography>
            <Checkbox
              color={"primary"}
              checked={job.email_on_failure}
              onChange={event =>
                changeHandler("email_on_failure", event.target.checked)
              }
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} justify={"center"}>
        <Grid item>
          <Button
            color={"primary"}
            variant={"outlined"}
            onClick={createHandler}
          >
            Create
          </Button>
        </Grid>
        <Grid item>
          <Button
            color={"primary"}
            variant={"outlined"}
            onClick={cancelHandler}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
