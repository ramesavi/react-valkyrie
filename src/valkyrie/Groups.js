import React, {useEffect, useState} from 'react';
import axios from "axios"
import MaterialTable from "material-table";

const Triggers = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get("/groups")
            .then(response => setGroups(response.data))
    }, []);

    return (
        <div style={{marginTop: "25px"}}>

            <MaterialTable
                columns={[
                    {title: "Name", field: "name"},
                    {title: "Email", field: "email"},
                ]}
                data={groups}
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

export default Triggers;