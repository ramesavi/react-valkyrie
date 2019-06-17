import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

export default props => {
  console.log("props ");
  console.log(props);
  const { id } = props.match.params;
  const groupId = props.group.id;
  const [{ instances, isLoading }, setInstances] = useState({
    instances: [],
    isLoading: true
  });
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`/job/fetch/group/${groupId}/job/${id}`).then(response => {
      setJob(response.data);
    });

    axios.get("/instance/job/list/job/" + id).then(response => {
      setInstances({ instances: response.data, isLoading: false });
    });
  }, [groupId, id]);

  return (
    <div style={{ marginTop: "25px" }}>
      {job != null ? (
        <MaterialTable
          columns={[
            {
              title: "Id",
              field: "id",
              render: instance => (
                <Link to={"/instance/job/log/" + instance.id}>
                  {instance.id}
                </Link>
              )
            },
            { title: "StartTime", field: "start_time" },
            { title: "EndTime", field: "end_time" },
            { title: "SeqId", field: "seq_id", defaultSort: "desc" },
            { title: "Status", field: "status" },
            { title: "Agent", field: "agent" }
          ]}
          data={instances}
          title={"Job Instances of " + job.name}
          options={{
            exportButton: true,
            pageSize: 10,
            pageSizeOptions: [5, 10, 25, 50, 100]
          }}
          isLoading={isLoading}
          style={{ marginTop: "25px" }}
        />
      ) : null}
    </div>
  );
};
