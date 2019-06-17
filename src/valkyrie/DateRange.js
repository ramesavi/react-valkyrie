import TextField from "@material-ui/core/TextField";
import { DateRangePicker } from "react-date-range";
import React, { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import Button from "@material-ui/core/Button"; // theme css file
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { borders } from "@material-ui/system";
import useTheme from "@material-ui/core/styles/useTheme";

const format = "YYYY-MM-DD";

export default props => {
  const theme = useTheme();

  const dateRangeRef = useRef();

  const [{ startDate, endDate }, setRange] = useState({
    startDate: props.startDate,
    endDate: props.endDate
  });

  const [show, setShow] = useState(false);

  const handleClick = event => {
    if (!dateRangeRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  const handleEscape = event => {
    console.log(event);
    if (event.key === "Escape") {
      setShow(false);
    }
  };

  useEffect(() => {
    const events = ["click", "keydown"];
    if (show) {
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  });

  const toggleShowHandler = () => {
    setShow(!show);
  };

  const dateChangeHandler = ({ selection: { startDate, endDate } }) => {
    setRange({ startDate: moment(startDate), endDate: moment(endDate) });
  };

  const cancelClickHandler = () => {
    setRange({
      startDate: props.startDate,
      endDate: props.endDate
    });
    setShow(false);
  };

  return (
    <>
      <TextField
        id="outlined-name"
        label="Date Range"
        value={`${startDate.format(format)} - ${endDate.format(format)}`}
        margin="normal"
        variant="outlined"
        style={{ width: "225px" }}
        onClick={toggleShowHandler}
        InputProps={{
          readOnly: true
        }}
      />

      <Box
        ref={dateRangeRef}
        style={{
          position: "absolute",
          display: show ? "block" : "none",
          zIndex: theme.zIndex.drawer + 1,
          padding: theme.spacing(1),
          backgroundColor: theme.palette.common.white
        }}
        border={1}
      >
        <DateRangePicker
          ranges={[
            { startDate: startDate, endDate: endDate, key: "selection" }
          ]}
          onChange={dateChangeHandler}
          months={2}
          direction={"horizontal"}
          linkedCalendars={true}
        />
        <Grid container justify={"flex-end"} spacing={2}>
          <Grid item>
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={() => {
                props.onChange(moment(startDate), moment(endDate));
                setShow(false);
              }}
            >
              Done
            </Button>
          </Grid>
          <Grid item>
            <Button
              color={"secondary"}
              variant={"contained"}
              onClick={cancelClickHandler}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
