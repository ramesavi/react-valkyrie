import React, {useEffect, useState} from 'react'
import axios from "axios"
import MaterialTable from "material-table";
import {Checkbox} from "@material-ui/core";

export default () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        axios.get("/scheduler/agents")
            .then(response => setAgents(response.data))
    }, []);

    return (
        <div style={{marginTop: "25px"}}>

            <MaterialTable
                columns={[
                    {title: "Name", field: "name"},
                    {
                        title: "Active",
                        field: "active",
                        render: row => row.active ? <Checkbox checked color={"primary"}/> :
                            <Checkbox color={"primary"}/>
                    },
                    {title: "Last Checkin Time", field: "last_checkin_time"},
                    {title: "Checkin Interval", field: "checkin_interval"},
                ]}
                data={agents}
                title="Agents"
                options={{
                    // filtering: true,
                    exportButton: true
                }}
            />
        </div>
    );
}
