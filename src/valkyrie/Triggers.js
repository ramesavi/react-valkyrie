import React, {useEffect, useState} from 'react';
import axios from "axios"
import MaterialTable from "material-table";
import Switch from '@material-ui/core/Switch';
import 'react-table/react-table.css'

export default props => {
    const {group} = props;
    const [triggers, setTriggers] = useState([]);

    useEffect(() => {
        axios.get("/trigger/list/group/" + group.id)
            .then(response => setTriggers(response.data))
    }, [group.id]);

    return (
        <div style={{marginTop: "25px"}}>

            <MaterialTable
                columns={[
                    {title: "Name", field: "name"},
                    {title: "Job Name", field: "job_name"},
                    {title: "Schedule", field: "cron"},
                    {title: "Enabled", field: "disable", render: row => row.disable ? <Switch/> : <Switch checked/>},
                    {title: "Description", field: "description"},
                ]}
                data={triggers}
                title="Triggers"
                options={{
                    exportButton: true,
                    pageSize: 10,
                    pageSizeOptions: [5, 10, 25, 50, 100],
                }}
            />
        </div>
    );
};
