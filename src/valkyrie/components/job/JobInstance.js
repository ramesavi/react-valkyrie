import React, {useEffect, useState} from "react"
import axios from "axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {TextField} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableBody from "@material-ui/core/TableBody";


const useStyles = makeStyles(theme => ({
    table: {
        borderRadius: theme.spacing(1),
        border: "1px solid black"
    },
    row: {
        "&:nth-child(even)": {
            backgroundColor: "#f1f1f1"
        },
        "&:hover": {
            backgroundColor: "#c1c1c1"
        }
    }
}));

export default props => {
    const classes = useStyles();
    const {jobInstanceId} = props.match.params;
    const [jobInstance, setJobInstance] = useState();
    const [jobInstanceLogs, setJobInstanceLogs] = useState();
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        axios.get(`/instance/fetch/${jobInstanceId}`)
            .then(response => setJobInstance(response.data))
    }, [jobInstanceId]);


    useEffect(() => {
        axios.get(`/instance/logs/${jobInstanceId}`)
            .then(response => setJobInstanceLogs(response.data))
    }, [jobInstanceId]);




    const keys = ['job_name', 'trigger_name', 'start_time', 'end_time', 'status', 'seq_id', 'return_code', 'agent'];
    const labels = ['JobName', 'Trigger', 'StartTime', 'EndTime', 'Status', 'Sequence', 'Exit', 'Agent'];


    const info = jobInstance &&
        <Table className={classes.table}>
            <TableBody>
            {
                keys
                    .map((key, index) => (
                            <TableRow key={key} style={{border: "1px solid black"}} className={classes.row}>
                                <TableCell style={{border: "1px solid black"}}>{labels[index]}</TableCell>
                                <TableCell style={{border: "1px solid black"}}>{jobInstance[key]}</TableCell>
                            </TableRow>
                        )
                    )
            }
            </TableBody>
        </Table>;

    const stdout = jobInstanceLogs &&
        <TextField value={jobInstanceLogs.stdout} variant={"filled"} InputProps={{readOnly: true}} rows={50} fullWidth
                   multiline/>;

    const stderr = jobInstanceLogs &&
        <TextField value={jobInstanceLogs.stderr} variant={"filled"} InputProps={{readOnly: true}} rowsMax={50}
                   fullWidth
                   multiline/>;

    const tabChangeHandler = (event, newValue) => setCurrentTab(newValue);

    return (
        <>
            <Paper square>
                <Tabs value={currentTab} indicatorColor="primary" textColor="primary" onChange={tabChangeHandler}>
                    <Tab label={"Info"}/>
                    <Tab label={"STDOUT"}/>
                    <Tab label={"STDERR"}/>
                </Tabs>
            </Paper>

            {
                currentTab === 0 && info
            }
            {
                currentTab === 1 && stdout
            }
            {
                currentTab === 2 && stderr
            }
        </>
    )
}